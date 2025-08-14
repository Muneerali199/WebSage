// WebSage Content Script - Enhanced with Advanced NLP and Conversation Intelligence

// Prevent multiple script executions
if (window.webSageLoaded) {
  console.log('WebSage already loaded, skipping initialization');
} else {
  window.webSageLoaded = true;

  // Intelligent Context Processor for optimized page analysis
  class IntelligentContextProcessor {
    constructor() {
      this.cache = new Map();
      this.compressionRatio = 0.3; // Target 30% of original content
    }

    // Fast hash function for content change detection
    simpleHash(str) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
      }
      return hash.toString();
    }

    // Extract and prioritize content intelligently
    extractIntelligentContext(maxTokens = 1500) {
      const startTime = performance.now();

      // Get page metadata
      const title = document.title || '';
      const url = window.location.href;
      const contentHash = this.simpleHash(document.body.innerText);

      // Check cache first
      const cacheKey = `${url}_${contentHash}`;
      if (this.cache.has(cacheKey)) {
        return this.cache.get(cacheKey);
      }

      // Priority content extraction
      const context = {
        title,
        url: url.split('?')[0], // Remove query params
        keyContent: this.extractKeyContent(),
        summary: this.generateQuickSummary(),
        metadata: this.extractMetadata(),
        processingTime: 0
      };

      // Compress to fit token limit
      const compressed = this.compressContext(context, maxTokens);

      context.processingTime = performance.now() - startTime;

      // Cache result
      this.cache.set(cacheKey, compressed);

      // Limit cache size
      if (this.cache.size > 10) {
        const firstKey = this.cache.keys().next().value;
        this.cache.delete(firstKey);
      }

      return compressed;
    }

    extractKeyContent() {
      const selectors = [
        'h1, h2, h3', // Headers
        'p:not(:empty)', // Paragraphs
        'article', // Articles
        'main', // Main content
        '[role="main"]', // ARIA main
        '.content, .post, .article', // Common content classes
        'blockquote', // Quotes
        'li' // List items
      ];

      const keyElements = [];

      selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          const text = el.innerText?.trim();
          if (text && text.length > 20 && text.length < 500) {
            keyElements.push({
              type: el.tagName.toLowerCase(),
              text: text,
              importance: this.calculateImportance(el)
            });
          }
        });
      });

      // Sort by importance and return top content
      return keyElements
        .sort((a, b) => b.importance - a.importance)
        .slice(0, 15)
        .map(el => el.text);
    }

    calculateImportance(element) {
      let score = 0;
      const tag = element.tagName.toLowerCase();
      const text = element.innerText?.trim() || '';

      // Tag-based scoring
      const tagScores = {
        'h1': 10, 'h2': 8, 'h3': 6,
        'p': 3, 'article': 7, 'main': 8,
        'blockquote': 5, 'li': 2
      };
      score += tagScores[tag] || 1;

      // Position scoring (earlier = more important)
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight) score += 3; // Visible content
      if (rect.top < 200) score += 2; // Above fold

      // Length scoring (moderate length preferred)
      if (text.length > 50 && text.length < 300) score += 2;

      // Class/ID based scoring
      const className = element.className.toLowerCase();
      const id = element.id.toLowerCase();
      if (className.includes('title') || className.includes('heading')) score += 3;
      if (className.includes('content') || className.includes('main')) score += 2;
      if (id.includes('main') || id.includes('content')) score += 2;

      return score;
    }

    generateQuickSummary() {
      const paragraphs = Array.from(document.querySelectorAll('p'))
        .map(p => p.innerText?.trim())
        .filter(text => text && text.length > 50)
        .slice(0, 3);

      return paragraphs.join(' ').substring(0, 400);
    }

    extractMetadata() {
      const meta = {};

      // Common meta tags
      const metaTags = document.querySelectorAll('meta[name], meta[property]');
      metaTags.forEach(tag => {
        const name = tag.getAttribute('name') || tag.getAttribute('property');
        const content = tag.getAttribute('content');
        if (name && content) {
          if (name.includes('description') || name.includes('og:description')) {
            meta.description = content.substring(0, 200);
          }
          if (name.includes('keywords')) {
            meta.keywords = content.split(',').slice(0, 5).join(', ');
          }
        }
      });

      // Page type detection
      if (document.querySelector('article')) meta.type = 'article';
      else if (document.querySelector('form')) meta.type = 'form';
      else if (document.querySelector('table')) meta.type = 'data';
      else meta.type = 'page';

      return meta;
    }

    compressContext(context, maxTokens) {
      // Estimate tokens (rough: 1 token ≈ 4 characters)
      const estimateTokens = (text) => Math.ceil(text.length / 4);

      let compressed = {
        title: context.title,
        url: context.url,
        type: context.metadata.type,
        summary: context.summary
      };

      let currentTokens = estimateTokens(JSON.stringify(compressed));
      const remainingTokens = maxTokens - currentTokens;

      if (remainingTokens > 0 && context.keyContent.length > 0) {
        // Add key content until we hit the limit
        const keyContent = [];
        for (const content of context.keyContent) {
          const contentTokens = estimateTokens(content);
          if (currentTokens + contentTokens <= maxTokens) {
            keyContent.push(content);
            currentTokens += contentTokens;
          } else {
            break;
          }
        }
        compressed.keyContent = keyContent;
      }

      return compressed;
    }

    formatForAI(context) {
      let formatted = `Page: ${context.title}\nURL: ${context.url}\nType: ${context.type}\n\n`;

      if (context.summary) {
        formatted += `Summary: ${context.summary}\n\n`;
      }

      if (context.keyContent && context.keyContent.length > 0) {
        formatted += `Key Content:\n${context.keyContent.join('\n\n')}\n\n`;
      }

      return formatted.trim();
    }
  }

  // WebSage Chat Class
  class WebSageChat {
    constructor() {
      this.isVisible = false;
      this.chatHistory = [];
      this.settings = {};
      this.chatWindow = null;
      this.contextCache = new Map();
      this.pageMemory = {
        url: '',
        title: '',
        summary: '',
        keyPoints: [],
        lastUpdated: 0,
        contentHash: ''
      };
      this.intelligentContext = new IntelligentContextProcessor();
      // Initialize NLP processor if available
      try {
        this.nlpProcessor = window.AdvancedNLPProcessor ? new window.AdvancedNLPProcessor() : null;
      } catch (error) {
        console.warn('Failed to initialize NLP processor:', error);
        this.nlpProcessor = null;
      }
      this.conversationInsights = {
        userPreferences: {},
        commonQuestions: [],
        helpfulResponses: [],
        sessionMetrics: {
          startTime: Date.now(),
          messageCount: 0,
          avgResponseTime: 0,
          userSatisfaction: 'unknown'
        }
      };

      this.init();
    }

    async init() {
      await this.loadSettings();
      await this.loadConversationMemory();
      this.createChatWindow();
      this.setupGlobalToggle();
    }

    async loadSettings() {
      return new Promise((resolve) => {
        chrome.storage.local.get(['webSageSettings'], (result) => {
          this.settings = result.webSageSettings || {
            provider: 'openai',
            model: 'gpt-4o',
            contextEnabled: true,
            memoryEnabled: true,
            contextMode: 'intelligent',
            maxTokens: 1500,
            theme: 'light',
            nlpEnabled: true,
            sentimentAnalysis: true,
            intentClassification: true,
            conversationInsights: true,
            apiKeys: {}
          };
          resolve();
        });
      });
    }

    setupGlobalToggle() {
      window.webSageToggle = () => {
        console.log('WebSage toggle called');
        this.toggle();
      };

      // Setup context menu handler
      window.webSageHandleContextMenu = (action, text) => {
        console.log('Context menu action:', action, text);
        this.handleContextMenuAction(action, text);
      };

      console.log('WebSage toggle and context menu functions set up');
    }

    async handleContextMenuAction(action, text) {
      // Ensure chat window is visible
      if (!this.isVisible) {
        this.show();
      }

      // Wait a moment for the window to be ready
      await new Promise(resolve => setTimeout(resolve, 100));

      let message = '';
      switch (action) {
        case 'explain':
          message = `Please explain this text: "${text}"`;
          break;
        case 'summarize':
          message = `Please summarize this text: "${text}"`;
          break;
        case 'translate':
          message = `Please translate this text to English: "${text}"`;
          break;
        case 'analyze':
          message = `Please analyze the sentiment and tone of this text: "${text}"`;
          break;
        case 'toggle':
          return; // Just toggle, no message
        default:
          return;
      }

      // Set the message in the input and send it
      const input = this.chatWindow.querySelector('#websage-input');
      if (input && message) {
        input.value = message;
        this.autoResizeInput(input);
        // Auto-send the message
        setTimeout(() => this.sendMessage(), 100);
      }
    }

    createChatWindow() {
      if (this.chatWindow) return;

      this.chatWindow = document.createElement('div');
      this.chatWindow.id = 'websage-chat-window';
      this.chatWindow.className = `websage-chat-window ${this.settings.theme}`;
      this.chatWindow.innerHTML = this.getChatWindowHTML();

      document.body.appendChild(this.chatWindow);
      this.setupEventListeners();
      this.makeDraggable();
    }

    getChatWindowHTML() {
      return `
        <div class="websage-header">
          <div class="websage-title">
            <span class="websage-logo">🧠</span>
            WebSage
          </div>
          <div class="websage-performance" id="websage-performance"></div>
          <div class="websage-controls">
            <select id="websage-provider" class="websage-select">
              <option value="openai">OpenAI</option>
              <option value="gemini">Google Gemini</option>
              <option value="mistral">Mistral AI</option>
            </select>
            <button id="websage-clear" class="websage-btn-icon" title="Clear Chat">🗑️</button>
            <button id="websage-close" class="websage-btn-icon" title="Close">✕</button>
          </div>
        </div>
        <div class="websage-messages" id="websage-messages"></div>
        <div class="websage-input-container">
          <textarea 
            id="websage-input" 
            placeholder="Ask me anything about this page..."
            rows="1"
          ></textarea>
          <button id="websage-send" class="websage-btn-send">Send</button>
        </div>
        <div class="websage-status" id="websage-status"></div>
      `;
    }

    setupEventListeners() {
      const input = this.chatWindow.querySelector('#websage-input');
      const sendBtn = this.chatWindow.querySelector('#websage-send');
      const clearBtn = this.chatWindow.querySelector('#websage-clear');
      const closeBtn = this.chatWindow.querySelector('#websage-close');
      const providerSelect = this.chatWindow.querySelector('#websage-provider');

      // Set current provider
      providerSelect.value = this.settings.provider;

      // Send message
      sendBtn.addEventListener('click', () => this.sendMessage());

      // Input handling
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.sendMessage();
        }
      });

      input.addEventListener('input', () => {
        this.autoResizeInput(input);
      });

      // Clear chat
      clearBtn.addEventListener('click', () => this.clearChat());

      // Close window
      closeBtn.addEventListener('click', () => this.hide());

      // Provider change
      providerSelect.addEventListener('change', (e) => {
        this.settings.provider = e.target.value;
        this.saveSettings();
      });
    }

    autoResizeInput(input) {
      input.style.height = 'auto';
      input.style.height = Math.min(input.scrollHeight, 120) + 'px';
    }

    makeDraggable() {
      const header = this.chatWindow.querySelector('.websage-header');
      let isDragging = false;
      let currentX, currentY, initialX, initialY;

      header.addEventListener('mousedown', (e) => {
        if (e.target.tagName === 'BUTTON' || e.target.tagName === 'SELECT') return;

        isDragging = true;
        initialX = e.clientX - this.chatWindow.offsetLeft;
        initialY = e.clientY - this.chatWindow.offsetTop;

        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', stopDrag);
      });

      const drag = (e) => {
        if (!isDragging) return;

        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;

        this.chatWindow.style.left = currentX + 'px';
        this.chatWindow.style.top = currentY + 'px';
      };

      const stopDrag = () => {
        isDragging = false;
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', stopDrag);
      };
    }

    toggle() {
      if (this.isVisible) {
        this.hide();
      } else {
        this.show();
      }
    }

    show() {
      this.chatWindow.style.display = 'flex';
      this.isVisible = true;

      // Focus input
      setTimeout(() => {
        const input = this.chatWindow.querySelector('#websage-input');
        input.focus();
      }, 100);
    }

    hide() {
      this.chatWindow.style.display = 'none';
      this.isVisible = false;
    }

    async sendMessage() {
      const input = this.chatWindow.querySelector('#websage-input');
      const message = input.value.trim();

      if (!message) return;

      // Refresh settings to ensure we have the latest API keys
      await this.loadSettings();

      // Check API key with better validation
      const apiKey = this.settings.apiKeys && this.settings.apiKeys[this.settings.provider];
      if (!apiKey || apiKey.trim() === '') {
        this.showError(`Please set up your ${this.settings.provider.toUpperCase()} API key in the extension settings.`);
        return;
      }

      // Update session metrics
      this.conversationInsights.sessionMetrics.messageCount++;

      // Process message with NLP if available
      let nlpAnalysis = null;
      if (this.nlpProcessor && this.settings.nlpEnabled) {
        nlpAnalysis = this.nlpProcessor.updateConversationContext(message, '');

        // Show sentiment indicator if strong sentiment detected
        if (this.settings.sentimentAnalysis && nlpAnalysis.sentiment.confidence > 0.7) {
          this.showSentimentIndicator(nlpAnalysis.sentiment.sentiment);
        }
      }

      // Add user message with NLP insights
      this.addMessage('user', message, nlpAnalysis);
      input.value = '';
      this.autoResizeInput(input);

      // Show intelligent typing indicator
      if (nlpAnalysis && this.settings.intentClassification) {
        this.showIntelligentTyping(nlpAnalysis.intent.intent);
      } else {
        this.showTyping();
      }

      const startTime = performance.now();
      let contextTime = 0;

      try {
        let context = '';
        if (this.settings.contextEnabled) {
          const contextStart = performance.now();
          context = this.getEnhancedPageContext();
          contextTime = performance.now() - contextStart;
        }

        // Enhance message with NLP insights if available
        let enhancedMessage = message;
        if (this.nlpProcessor && this.settings.nlpEnabled) {
          enhancedMessage = this.nlpProcessor.generateContextualPrompt(message, context);
        }

        const response = await this.callAI(enhancedMessage, context);
        const totalTime = performance.now() - startTime;

        // Update NLP context with AI response if available
        if (this.nlpProcessor && this.settings.nlpEnabled) {
          this.nlpProcessor.updateConversationContext(message, response);
        }

        this.hideTyping();
        this.addMessage('assistant', response);

        // Update performance indicator with NLP processing time
        this.updatePerformanceIndicator(contextTime, totalTime - contextTime, nlpAnalysis);

        // Update session metrics
        this.conversationInsights.sessionMetrics.avgResponseTime =
          (this.conversationInsights.sessionMetrics.avgResponseTime + (totalTime - contextTime)) / 2;

      } catch (error) {
        this.hideTyping();
        this.showError('Failed to get AI response: ' + error.message);
      }
    }

    updatePerformanceIndicator(contextTime, apiTime, nlpAnalysis) {
      const perfElement = this.chatWindow.querySelector('#websage-performance');
      if (perfElement) {
        const contextMs = Math.round(contextTime);
        const apiMs = Math.round(apiTime);
        let displayText = `${contextMs}ms + ${apiMs}ms`;
        let titleText = `Context processing: ${contextMs}ms, API response: ${apiMs}ms`;

        if (nlpAnalysis && this.settings.nlpEnabled) {
          displayText += ` | ${nlpAnalysis.sentiment.sentiment}`;
          titleText += `, Sentiment: ${nlpAnalysis.sentiment.sentiment} (${Math.round(nlpAnalysis.sentiment.confidence * 100)}%)`;
          if (nlpAnalysis.intent.intent !== 'general') {
            titleText += `, Intent: ${nlpAnalysis.intent.intent}`;
          }
        }

        perfElement.textContent = displayText;
        perfElement.title = titleText;
      }
    }

    showSentimentIndicator(sentiment) {
      const status = this.chatWindow.querySelector('#websage-status');
      const emoji = sentiment === 'positive' ? '😊' : sentiment === 'negative' ? '😔' : '😐';
      status.textContent = `${emoji} Detected ${sentiment} sentiment`;
      status.className = `websage-status websage-info`;

      setTimeout(() => {
        status.textContent = '';
        status.className = 'websage-status';
      }, 3000);
    }

    showIntelligentTyping(intent) {
      const messagesContainer = this.chatWindow.querySelector('#websage-messages');
      const typingDiv = document.createElement('div');
      typingDiv.id = 'websage-typing';
      typingDiv.className = 'websage-message websage-message-assistant';

      let typingMessage = 'AI is thinking...';
      switch (intent) {
        case 'question':
          typingMessage = 'Analyzing your question...';
          break;
        case 'request':
          typingMessage = 'Processing your request...';
          break;
        case 'command':
          typingMessage = 'Executing command...';
          break;
        case 'complaint':
          typingMessage = 'Understanding the issue...';
          break;
        default:
          typingMessage = 'AI is thinking...';
      }

      typingDiv.innerHTML = `<div class="websage-typing-indicator">${typingMessage}</div>`;

      messagesContainer.appendChild(typingDiv);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    getEnhancedPageContext() {
      if (!this.settings.contextEnabled) return '';

      const maxTokens = this.settings.maxTokens || 1500;
      const basicContext = this.getPageContext();

      // Add NLP-enhanced context if available
      if (this.nlpProcessor && this.settings.nlpEnabled) {
        const pageText = document.body.innerText || '';
        const keywords = this.nlpProcessor.extractKeywords(pageText, 10);
        const summary = this.nlpProcessor.summarizeText(pageText, 3);
        const topics = this.nlpProcessor.extractTopics(pageText);

        let enhancedContext = basicContext;

        if (keywords.length > 0) {
          enhancedContext += `\n\nKey Terms: ${keywords.map(k => k.word).join(', ')}`;
        }

        if (topics.length > 0) {
          enhancedContext += `\nMain Topics: ${topics.map(t => t.topic).join(', ')}`;
        }

        if (summary && summary !== pageText) {
          enhancedContext += `\nPage Summary: ${summary}`;
        }

        return enhancedContext;
      }

      return basicContext;
    }

    addMessage(role, content, nlpAnalysis = null) {
      this.addMessageToUI(role, content, true, nlpAnalysis);
    }

    addMessageToUI(role, content, saveToHistory = true, nlpAnalysis = null) {
      const messagesContainer = this.chatWindow.querySelector('#websage-messages');
      const messageDiv = document.createElement('div');
      messageDiv.className = `websage-message websage-message-${role}`;

      messageDiv.innerHTML = `
        <div class="websage-message-content">${this.formatMessage(content)}</div>
        ${role === 'assistant' ? '<button class="websage-copy-btn" title="Copy">📋</button>' : ''}
      `;

      messagesContainer.appendChild(messageDiv);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;

      // Add copy functionality
      if (role === 'assistant') {
        const copyBtn = messageDiv.querySelector('.websage-copy-btn');
        copyBtn.addEventListener('click', () => {
          navigator.clipboard.writeText(content);
          copyBtn.textContent = '✓';
          setTimeout(() => copyBtn.textContent = '📋', 1000);
        });
      }

      if (saveToHistory) {
        this.chatHistory.push({ role, content });
        // Auto-save conversation memory after each message
        this.saveConversationMemory();
      }
    }

    formatMessage(content) {
      // Basic markdown-like formatting
      return content
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`(.*?)`/g, '<code>$1</code>')
        .replace(/\n/g, '<br>');
    }

    showTyping() {
      const messagesContainer = this.chatWindow.querySelector('#websage-messages');
      const typingDiv = document.createElement('div');
      typingDiv.id = 'websage-typing';
      typingDiv.className = 'websage-message websage-message-assistant';
      typingDiv.innerHTML = '<div class="websage-typing-indicator">AI is thinking...</div>';

      messagesContainer.appendChild(typingDiv);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideTyping() {
      const typing = this.chatWindow.querySelector('#websage-typing');
      if (typing) typing.remove();
    }

    showError(message) {
      const status = this.chatWindow.querySelector('#websage-status');
      status.textContent = message;
      status.className = 'websage-status websage-error';

      setTimeout(() => {
        status.textContent = '';
        status.className = 'websage-status';
      }, 5000);
    }

    clearChat() {
      const messagesContainer = this.chatWindow.querySelector('#websage-messages');
      messagesContainer.innerHTML = '';
      this.chatHistory = [];

      // Clear memory for this page
      const url = window.location.href.split('?')[0];
      const storageKey = `websage_memory_${this.simpleHash(url)}`;
      chrome.storage.local.remove([storageKey]);

      // Clear context cache
      this.intelligentContext.cache.clear();
    }

    getPageContext() {
      if (!this.settings.contextEnabled) return '';

      const maxTokens = this.settings.maxTokens || 1500;

      switch (this.settings.contextMode) {
        case 'intelligent':
          const context = this.intelligentContext.extractIntelligentContext(maxTokens);
          return this.intelligentContext.formatForAI(context);

        case 'full':
          // Full page content (legacy mode)
          const textContent = document.body.innerText || document.body.textContent || '';
          if (textContent.length > maxTokens * 4) { // Rough token estimation
            return textContent.substring(0, maxTokens * 4) + '...';
          }
          return textContent;

        case 'minimal':
          // Just title and basic info
          return `Page: ${document.title}\nURL: ${window.location.href.split('?')[0]}`;

        default:
          return this.intelligentContext.formatForAI(
            this.intelligentContext.extractIntelligentContext(maxTokens)
          );
      }
    }

    // Enhanced memory system for persistent conversations
    async loadConversationMemory() {
      const url = window.location.href.split('?')[0]; // Remove query params
      const storageKey = `websage_memory_${this.simpleHash(url)}`;

      return new Promise((resolve) => {
        chrome.storage.local.get([storageKey], (result) => {
          const memory = result[storageKey];
          if (memory && Date.now() - memory.timestamp < 24 * 60 * 60 * 1000) { // 24 hours
            this.chatHistory = memory.chatHistory || [];
            this.pageMemory = memory.pageMemory || this.pageMemory;
            this.restoreConversation();
          }
          resolve();
        });
      });
    }

    async saveConversationMemory() {
      const url = window.location.href.split('?')[0];
      const storageKey = `websage_memory_${this.simpleHash(url)}`;

      const memory = {
        chatHistory: this.chatHistory.slice(-20), // Keep last 20 messages
        pageMemory: this.pageMemory,
        timestamp: Date.now(),
        url: url
      };

      chrome.storage.local.set({ [storageKey]: memory });
    }

    restoreConversation() {
      const messagesContainer = this.chatWindow.querySelector('#websage-messages');
      messagesContainer.innerHTML = '';

      this.chatHistory.forEach(msg => {
        this.addMessageToUI(msg.role, msg.content, false); // Don't save to history again
      });
    }

    simpleHash(str) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
      }
      return Math.abs(hash).toString();
    }

    async callAI(message, context) {
      const { provider } = this.settings;
      const apiKey = this.settings.apiKeys[provider];

      switch (provider) {
        case 'openai':
          return this.callOpenAI(message, context, apiKey);
        case 'gemini':
          return this.callGemini(message, context, apiKey);
        case 'mistral':
          return this.callMistral(message, context, apiKey);
        default:
          throw new Error('Unknown AI provider');
      }
    }

    async callOpenAI(message, context, apiKey) {
      const messages = [
        ...(context ? [{ role: 'system', content: `Page context: ${context}` }] : []),
        ...this.chatHistory.slice(-10), // Last 10 messages for context
        { role: 'user', content: message }
      ];

      // Retry logic for rate limiting
      const maxRetries = 3;
      let retryDelay = 1000;

      for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
          const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              model: this.settings.model || 'gpt-4o',
              messages,
              max_tokens: 1000,
              temperature: 0.7
            })
          });

          if (response.status === 429) {
            if (attempt < maxRetries - 1) {
              await new Promise(resolve => setTimeout(resolve, retryDelay));
              retryDelay *= 2;
              continue;
            }
            throw new Error(`Rate limit exceeded. Please wait a moment and try again.`);
          }

          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
          }

          const data = await response.json();
          return data.choices[0].message.content;
        } catch (error) {
          if (attempt === maxRetries - 1) {
            throw error;
          }
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }
    }

    async callGemini(message, context, apiKey) {
      const prompt = context ? `Context: ${context}\n\nQuestion: ${message}` : message;
      const model = this.settings.model || 'gemini-2.0-flash-exp';

      // Retry logic for rate limiting
      const maxRetries = 3;
      let retryDelay = 1000; // Start with 1 second

      for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
          const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              contents: [{
                parts: [{ text: prompt }]
              }]
            })
          });

          if (response.status === 429) {
            // Rate limited - wait and retry
            if (attempt < maxRetries - 1) {
              await new Promise(resolve => setTimeout(resolve, retryDelay));
              retryDelay *= 2; // Exponential backoff
              continue;
            }
            throw new Error(`Rate limit exceeded. Please wait a moment and try again.`);
          }

          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
          }

          const data = await response.json();

          if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
            throw new Error('Invalid response from Gemini API');
          }

          return data.candidates[0].content.parts[0].text;
        } catch (error) {
          if (attempt === maxRetries - 1) {
            throw error;
          }
          // Wait before retrying on other errors too
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }
    }

    async callMistral(message, context, apiKey) {
      const messages = [
        ...(context ? [{ role: 'system', content: `Page context: ${context}` }] : []),
        ...this.chatHistory.slice(-10),
        { role: 'user', content: message }
      ];

      // Retry logic for rate limiting
      const maxRetries = 3;
      let retryDelay = 1000;

      for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
          const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              model: this.settings.model || 'mistral-large-latest',
              messages,
              max_tokens: 1000,
              temperature: 0.7
            })
          });

          if (response.status === 429) {
            if (attempt < maxRetries - 1) {
              await new Promise(resolve => setTimeout(resolve, retryDelay));
              retryDelay *= 2;
              continue;
            }
            throw new Error(`Rate limit exceeded. Please wait a moment and try again.`);
          }

          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Mistral API error: ${response.status} - ${errorText}`);
          }

          const data = await response.json();
          return data.choices[0].message.content;
        } catch (error) {
          if (attempt === maxRetries - 1) {
            throw error;
          }
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }
    }

    async saveSettings() {
      chrome.storage.local.set({ webSageSettings: this.settings });
    }
  }

  // Initialize WebSage when page loads
  console.log('WebSage content script loaded');

  // Load NLP processor first, then initialize WebSage
  const loadNLPProcessor = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = chrome.runtime.getURL('nlp-processor.js');
      script.onload = resolve;
      script.onerror = () => {
        console.warn('NLP processor failed to load, using basic functionality');
        // Don't create a fallback class, just resolve
        resolve();
      };
      document.head.appendChild(script);
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', async () => {
      console.log('WebSage initializing on DOMContentLoaded');
      await loadNLPProcessor();
      new WebSageChat();
    });
  } else {
    console.log('WebSage initializing immediately');
    loadNLPProcessor().then(() => {
      new WebSageChat();
    });
  }
}