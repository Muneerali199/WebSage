// WebSage Content Script - Enhanced with Advanced NLP and Conversation Intelligence

// Prevent multiple script executions
if (window.webSageLoaded) {
  console.log('WebSage already loaded, skipping initialization');
} else {
  window.webSageLoaded = true;

  // Embed NLP Processor directly to avoid loading issues
  console.log('🔄 Defining AdvancedNLPProcessor inline...');
  
  class AdvancedNLPProcessor {
    constructor() {
      console.log('✨ AdvancedNLPProcessor constructor called');
      this.fakeNewsCache = new Map();
    }

    detectFakeNews(text) {
      console.log('🔍 Analyzing text for fake news:', text.substring(0, 50) + '...');
      
      const lowerText = text.toLowerCase();
      let suspicionScore = 0;
      const indicators = [];

      // Sensational words
      const sensationalWords = [
        'shocking', 'unbelievable', 'incredible', 'amazing', 'stunning', 'outrageous',
        'explosive', 'bombshell', 'devastating', 'mind-blowing', 'jaw-dropping'
      ];
      
      const sensationalCount = sensationalWords.filter(word => lowerText.includes(word)).length;
      if (sensationalCount > 0) {
        suspicionScore += sensationalCount * 3;
        indicators.push(`Contains ${sensationalCount} sensational words`);
      }

      // Clickbait phrases
      const clickbaitPhrases = [
        'you won\'t believe', 'what happens next', 'doctors hate', 'this one trick',
        'the results will surprise you', 'don\'t want you to know'
      ];
      
      const clickbaitCount = clickbaitPhrases.filter(phrase => lowerText.includes(phrase)).length;
      if (clickbaitCount > 0) {
        suspicionScore += clickbaitCount * 5;
        indicators.push(`Contains ${clickbaitCount} clickbait phrases`);
      }

      // ALL CAPS check
      const allCaps = (text.match(/[A-Z]{3,}/g) || []).length;
      if (allCaps > 2) {
        suspicionScore += allCaps;
        indicators.push(`Excessive use of ALL CAPS (${allCaps})`);
      }

      // Calculate risk level
      let riskLevel = 'low';
      let confidence = 0.6;

      if (suspicionScore >= 10) {
        riskLevel = 'high';
        confidence = 0.85;
      } else if (suspicionScore >= 5) {
        riskLevel = 'medium';
        confidence = 0.75;
      } else if (suspicionScore >= 2) {
        riskLevel = 'low-medium';
        confidence = 0.65;
      }

      const result = {
        riskLevel,
        suspicionScore,
        confidence,
        indicators,
        recommendation: this.getFakeNewsRecommendation(riskLevel)
      };

      console.log('📊 Fake news analysis result:', result);
      return result;
    }

    getFakeNewsRecommendation(riskLevel) {
      switch (riskLevel) {
        case 'high':
          return 'High risk of misinformation. Verify with multiple credible sources before sharing.';
        case 'medium':
          return 'Moderate risk. Cross-check facts with reliable news sources.';
        case 'low-medium':
          return 'Some concerning patterns detected. Consider fact-checking key claims.';
        default:
          return 'Content appears relatively reliable, but always verify important information.';
      }
    }

    detectBias(text) {
      console.log('⚖️ Analyzing text for bias:', text.substring(0, 50) + '...');
      
      const lowerText = text.toLowerCase();
      let biasScore = 0;
      const detectedBias = [];

      // Emotional words
      const emotionalWords = ['outrageous', 'disgusting', 'shocking', 'unbelievable', 'terrifying', 'amazing'];
      const emotionalCount = emotionalWords.filter(word => lowerText.includes(word)).length;
      if (emotionalCount > 1) {
        detectedBias.push('emotional');
        biasScore += emotionalCount * 2;
      }

      // Absolute statements
      const absoluteWords = ['all', 'every', 'always', 'never', 'everyone', 'no one', 'completely'];
      const absoluteCount = absoluteWords.filter(word => lowerText.includes(word)).length;
      if (absoluteCount > 2) {
        detectedBias.push('overgeneralizing');
        biasScore += absoluteCount;
      }

      const result = {
        biasTypes: detectedBias,
        biasScore,
        severity: biasScore > 6 ? 'high' : biasScore > 3 ? 'medium' : 'low',
        confidence: Math.min(0.9, 0.5 + biasScore * 0.05)
      };

      console.log('⚖️ Bias analysis result:', result);
      return result;
    }

    // Add missing methods that the content script expects
    updateConversationContext(userMessage, aiResponse) {
      // Simple implementation - just return basic analysis
      return {
        sentiment: this.analyzeSentiment(userMessage),
        intent: this.classifyIntent(userMessage),
        entities: { persons: [], organizations: [], locations: [] },
        topics: []
      };
    }

    analyzeSentiment(text) {
      const positiveWords = ['good', 'great', 'excellent', 'amazing', 'love', 'like', 'happy', 'pleased'];
      const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'dislike', 'angry', 'upset', 'sad'];
      
      const lowerText = text.toLowerCase();
      const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length;
      const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length;
      
      let sentiment = 'neutral';
      let confidence = 0.5;
      
      if (positiveCount > negativeCount) {
        sentiment = 'positive';
        confidence = Math.min(0.9, 0.5 + (positiveCount - negativeCount) * 0.1);
      } else if (negativeCount > positiveCount) {
        sentiment = 'negative';
        confidence = Math.min(0.9, 0.5 + (negativeCount - positiveCount) * 0.1);
      }
      
      return { sentiment, confidence };
    }

    classifyIntent(text) {
      const lowerText = text.toLowerCase();
      
      if (lowerText.includes('?') || lowerText.includes('what') || lowerText.includes('how') || lowerText.includes('why')) {
        return { intent: 'question', confidence: 0.8 };
      } else if (lowerText.includes('please') || lowerText.includes('can you') || lowerText.includes('help')) {
        return { intent: 'request', confidence: 0.7 };
      } else {
        return { intent: 'general', confidence: 0.5 };
      }
    }

    generateContextualPrompt(userMessage, pageContext) {
      // Simple implementation - just return the original message
      return userMessage;
    }

    extractKeywords(text, maxKeywords = 10) {
      const words = text.toLowerCase().split(/\W+/).filter(word => word.length > 3);
      const wordFreq = {};
      words.forEach(word => {
        wordFreq[word] = (wordFreq[word] || 0) + 1;
      });
      
      return Object.entries(wordFreq)
        .sort(([,a], [,b]) => b - a)
        .slice(0, maxKeywords)
        .map(([word, frequency]) => ({ word, frequency }));
    }

    summarizeText(text, maxSentences = 3) {
      const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 20);
      return sentences.slice(0, maxSentences).join('. ') + '.';
    }

    extractTopics(text) {
      // Simple topic extraction based on keywords
      const topicKeywords = {
        technology: ['code', 'programming', 'software', 'tech', 'computer'],
        business: ['company', 'business', 'market', 'sales', 'revenue'],
        health: ['health', 'medical', 'doctor', 'treatment', 'medicine']
      };
      
      const lowerText = text.toLowerCase();
      const topics = [];
      
      Object.entries(topicKeywords).forEach(([topic, keywords]) => {
        const count = keywords.filter(keyword => lowerText.includes(keyword)).length;
        if (count > 0) {
          topics.push({ topic, score: count });
        }
      });
      
      return topics.sort((a, b) => b.score - a.score);
    }

    // Comprehensive content analysis method
    analyzeContent(text) {
      return {
        sentiment: this.analyzeSentiment(text),
        entities: { persons: [], organizations: [], locations: [], dates: [], urls: [], emails: [], numbers: [], technologies: [] },
        topics: this.extractTopics(text),
        fakeNews: this.detectFakeNews(text),
        bias: this.detectBias(text),
        readability: this.analyzeReadability(text),
        quality: this.assessContentQuality(text),
        keywords: this.extractKeywords(text, 5),
        summary: this.summarizeText(text, 2)
      };
    }

    // Simple readability analysis
    analyzeReadability(text) {
      const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
      const words = text.split(/\s+/).filter(w => w.length > 0);
      
      const avgWordsPerSentence = words.length / sentences.length || 0;
      
      let readingLevel = 'Standard';
      if (avgWordsPerSentence > 20) readingLevel = 'Difficult';
      else if (avgWordsPerSentence > 15) readingLevel = 'Fairly Difficult';
      else if (avgWordsPerSentence < 10) readingLevel = 'Easy';
      
      return {
        fleschScore: 60, // Simplified score
        readingLevel,
        avgWordsPerSentence: Math.round(avgWordsPerSentence * 10) / 10,
        totalWords: words.length,
        totalSentences: sentences.length
      };
    }

    // Simple content quality assessment
    assessContentQuality(text) {
      const fakeNewsAnalysis = this.detectFakeNews(text);
      const biasAnalysis = this.detectBias(text);
      
      let qualityScore = 100;
      qualityScore -= fakeNewsAnalysis.suspicionScore * 2;
      qualityScore -= biasAnalysis.biasScore * 1.5;
      qualityScore = Math.max(0, Math.min(100, qualityScore));
      
      let qualityLevel = '';
      if (qualityScore >= 80) qualityLevel = 'High';
      else if (qualityScore >= 60) qualityLevel = 'Good';
      else if (qualityScore >= 40) qualityLevel = 'Fair';
      else qualityLevel = 'Poor';
      
      return {
        overallScore: Math.round(qualityScore),
        qualityLevel,
        fakeNewsRisk: fakeNewsAnalysis.riskLevel,
        biasLevel: biasAnalysis.severity,
        readabilityLevel: 'Standard',
        recommendations: this.generateQualityRecommendations(fakeNewsAnalysis, biasAnalysis)
      };
    }

    generateQualityRecommendations(fakeNews, bias) {
      const recommendations = [];
      
      if (fakeNews.riskLevel === 'high' || fakeNews.riskLevel === 'medium') {
        recommendations.push('⚠️ Verify claims with credible sources');
      }
      
      if (bias.severity === 'high') {
        recommendations.push('🎯 Consider multiple perspectives on this topic');
      }
      
      if (recommendations.length === 0) {
        recommendations.push('✅ Content appears to meet quality standards');
      }
      
      return recommendations;
    }
  }

  // Make it globally available
  window.AdvancedNLPProcessor = AdvancedNLPProcessor;
  console.log('🧠 AdvancedNLPProcessor embedded and available globally');
  
  // Test it immediately
  try {
    const testInstance = new AdvancedNLPProcessor();
    console.log('✅ Test instance created successfully');
  } catch (error) {
    console.error('❌ Failed to create test instance:', error);
  }

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
      // Initialize NLP processor - should be available since it's loaded as content script
      this.nlpProcessor = null;
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
      this.initializeNLPProcessor();
    }

    // Initialize NLP processor - should be available immediately since it's loaded as content script
    initializeNLPProcessor() {
      try {
        console.log('🔍 Initializing embedded NLP processor...');
        
        if (window.AdvancedNLPProcessor) {
          this.nlpProcessor = new window.AdvancedNLPProcessor();
          console.log('✅ Embedded NLP processor initialized successfully');
        } else {
          console.error('❌ Embedded AdvancedNLPProcessor not found - this should not happen!');
        }
      } catch (error) {
        console.error('❌ Failed to initialize embedded NLP processor:', error);
        this.nlpProcessor = null;
      }
    }

    async loadSettings() {
      return new Promise((resolve) => {
        try {
          chrome.storage.local.get(['webSageSettings'], (result) => {
            if (chrome.runtime.lastError) {
              console.warn('Chrome storage error:', chrome.runtime.lastError);
              this.settings = this.getDefaultSettings();
              resolve();
              return;
            }
            
            this.settings = result.webSageSettings || this.getDefaultSettings();
            resolve();
          });
        } catch (error) {
          console.warn('Extension context invalidated, using default settings:', error);
          this.settings = this.getDefaultSettings();
          resolve();
        }
      });
    }

    getDefaultSettings() {
      return {
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

      // Setup page analysis handler
      window.webSageAnalyzePage = () => {
        this.analyzeCurrentPage();
      };

      console.log('WebSage toggle and context menu functions set up');
    }

    async handleContextMenuAction(action, text) {
      // Handle special actions that don't require chat
      if (action === 'analyze-page') {
        this.show();
        await new Promise(resolve => setTimeout(resolve, 100));
        this.analyzeCurrentPage();
        return;
      }

      if (action === 'check-credibility') {
        this.show();
        await new Promise(resolve => setTimeout(resolve, 100));
        this.checkPageCredibility();
        return;
      }

      // Handle text-based analysis actions
      if (action === 'check-fake-news' || action === 'detect-bias') {
        console.log('🔍 Fake news/bias detection requested');
        console.log('NLP Processor available:', !!this.nlpProcessor);
        console.log('Selected text:', text?.substring(0, 100) + '...');

        this.show();
        await new Promise(resolve => setTimeout(resolve, 100));

        if (!this.nlpProcessor) {
          console.error('❌ NLP processor not available');
          this.showError('NLP processor not loaded. Please refresh the page and try again.');
          return;
        }

        this.performTextAnalysisInChat(action, text);
        return;
      }

      // Ensure chat window is visible for regular actions
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

    // Perform text analysis and display results in chat
    async performTextAnalysisInChat(action, text) {
      if (!this.nlpProcessor || !text) {
        this.showError('NLP processor not available or no text selected.');
        return;
      }

      try {
        let analysis;
        let userMessage;
        let assistantMessage;

        if (action === 'check-fake-news') {
          analysis = this.nlpProcessor.detectFakeNews(text);
          userMessage = `Check this text for fake news: "${text.substring(0, 100)}${text.length > 100 ? '...' : ''}"`;
          assistantMessage = this.formatFakeNewsForChat(analysis, text);
        } else if (action === 'detect-bias') {
          analysis = this.nlpProcessor.detectBias(text);
          userMessage = `Analyze this text for bias: "${text.substring(0, 100)}${text.length > 100 ? '...' : ''}"`;
          assistantMessage = this.formatBiasForChat(analysis, text);
        }

        // Add messages to chat
        this.addMessage('user', userMessage);
        this.addMessage('assistant', assistantMessage);

      } catch (error) {
        console.error('Text analysis error:', error);
        this.showError('Analysis failed. Please try again.');
      }
    }

    formatFakeNewsForChat(analysis, text) {
      const riskEmoji = analysis.riskLevel === 'high' ? '🚨' : 
                       analysis.riskLevel === 'medium' ? '⚠️' : 
                       analysis.riskLevel === 'low-medium' ? '⚡' : '✅';
      
      let message = `${riskEmoji} **Fake News Analysis Results**\n\n`;
      message += `**Risk Level:** ${analysis.riskLevel.toUpperCase()}\n`;
      message += `**Suspicion Score:** ${analysis.suspicionScore}/20\n`;
      message += `**Confidence:** ${Math.round(analysis.confidence * 100)}%\n\n`;
      
      message += `**💡 Recommendation:**\n${analysis.recommendation}\n\n`;
      
      if (analysis.indicators.length > 0) {
        message += `**⚠️ Issues Detected:**\n`;
        analysis.indicators.forEach(indicator => {
          message += `• ${indicator}\n`;
        });
      } else {
        message += `**✅ No major issues detected**\n`;
      }
      
      return message;
    }

    formatBiasForChat(analysis, text) {
      const biasEmoji = analysis.severity === 'high' ? '🔴' : 
                       analysis.severity === 'medium' ? '🟡' : '🟢';
      
      let message = `${biasEmoji} **Bias Detection Results**\n\n`;
      message += `**Bias Severity:** ${analysis.severity.toUpperCase()}\n`;
      message += `**Bias Score:** ${analysis.biasScore}\n`;
      message += `**Confidence:** ${Math.round(analysis.confidence * 100)}%\n\n`;
      
      if (analysis.biasTypes.length > 0) {
        message += `**🎯 Detected Bias Types:**\n`;
        analysis.biasTypes.forEach(type => {
          message += `• ${type.replace('-', ' ')}\n`;
        });
      } else {
        message += `**✅ No significant bias detected**\nThe text appears to be relatively neutral and balanced.\n`;
      }
      
      return message;
    }

    // Perform text analysis for fake news and bias detection
    async performTextAnalysis(action, text) {
      if (!this.nlpProcessor || !text) {
        this.showError('NLP processor not available or no text selected.');
        return;
      }

      const analysisPanel = this.chatWindow.querySelector('#websage-analysis');
      analysisPanel.style.display = 'block';

      try {
        let analysis;
        let title;
        let content;

        if (action === 'check-fake-news') {
          analysis = this.nlpProcessor.detectFakeNews(text);
          title = '🛡️ Fake News Detection Results';
          content = this.formatFakeNewsResults(analysis, text);
        } else if (action === 'detect-bias') {
          analysis = this.nlpProcessor.detectBias(text);
          title = '⚖️ Bias Detection Results';
          content = this.formatBiasResults(analysis, text);
        }

        analysisPanel.innerHTML = `
          <div class="websage-analysis-results">
            <div class="websage-analysis-header">
              <h3>${title}</h3>
              <button class="websage-analysis-close" onclick="this.parentElement.parentElement.parentElement.style.display='none'">✕</button>
            </div>
            ${content}
          </div>
        `;

      } catch (error) {
        console.error('Text analysis error:', error);
        analysisPanel.innerHTML = '<div class="websage-analysis-error">❌ Analysis failed. Please try again.</div>';
      }
    }

    formatFakeNewsResults(analysis, text) {
      const riskColor = this.getRiskColor(analysis.riskLevel);

      return `
        <div class="websage-analysis-section">
          <div class="websage-selected-text">
            <strong>Analyzed Text:</strong>
            <div class="websage-text-preview">"${text.substring(0, 200)}${text.length > 200 ? '...' : ''}"</div>
          </div>
        </div>

        <div class="websage-analysis-grid">
          <div class="websage-analysis-card">
            <div class="websage-analysis-title">Risk Level</div>
            <div class="websage-analysis-score" style="color: ${riskColor}">
              ${analysis.riskLevel.toUpperCase()}
            </div>
            <div class="websage-analysis-detail">
              Suspicion Score: ${analysis.suspicionScore}/20
            </div>
          </div>

          <div class="websage-analysis-card">
            <div class="websage-analysis-title">Confidence</div>
            <div class="websage-analysis-score">
              ${Math.round(analysis.confidence * 100)}%
            </div>
          </div>
        </div>

        <div class="websage-analysis-section">
          <div class="websage-analysis-subtitle">💡 Recommendation</div>
          <div class="websage-analysis-recommendation">
            ${analysis.recommendation}
          </div>
        </div>

        ${analysis.indicators.length > 0 ? `
        <div class="websage-analysis-section">
          <div class="websage-analysis-subtitle">⚠️ Detected Issues</div>
          <ul class="websage-analysis-issues">
            ${analysis.indicators.map(indicator => `<li>${indicator}</li>`).join('')}
          </ul>
        </div>
        ` : ''}
      `;
    }

    formatBiasResults(analysis, text) {
      const biasColor = this.getSeverityColor(analysis.severity);

      return `
        <div class="websage-analysis-section">
          <div class="websage-selected-text">
            <strong>Analyzed Text:</strong>
            <div class="websage-text-preview">"${text.substring(0, 200)}${text.length > 200 ? '...' : ''}"</div>
          </div>
        </div>

        <div class="websage-analysis-grid">
          <div class="websage-analysis-card">
            <div class="websage-analysis-title">Bias Severity</div>
            <div class="websage-analysis-score" style="color: ${biasColor}">
              ${analysis.severity.toUpperCase()}
            </div>
            <div class="websage-analysis-detail">
              Score: ${analysis.biasScore}
            </div>
          </div>

          <div class="websage-analysis-card">
            <div class="websage-analysis-title">Confidence</div>
            <div class="websage-analysis-score">
              ${Math.round(analysis.confidence * 100)}%
            </div>
          </div>
        </div>

        ${analysis.biasTypes.length > 0 ? `
        <div class="websage-analysis-section">
          <div class="websage-analysis-subtitle">🎯 Detected Bias Types</div>
          <div class="websage-analysis-tags">
            ${analysis.biasTypes.map(type =>
        `<span class="websage-analysis-tag">${type.replace('-', ' ')}</span>`
      ).join('')}
          </div>
        </div>
        ` : `
        <div class="websage-analysis-section">
          <div class="websage-analysis-subtitle">✅ No Significant Bias Detected</div>
          <p>The text appears to be relatively neutral and balanced.</p>
        </div>
        `}
      `;
    }

    // Check page credibility using comprehensive analysis
    async checkPageCredibility() {
      if (!this.nlpProcessor) {
        this.showError('NLP processor not available. Please refresh the page.');
        return;
      }

      const analysisPanel = this.chatWindow.querySelector('#websage-analysis');
      analysisPanel.style.display = 'block';
      analysisPanel.innerHTML = '<div class="websage-analysis-loading">🏆 Checking page credibility...</div>';

      try {
        const pageText = document.body.innerText || document.body.textContent || '';

        if (pageText.length < 100) {
          analysisPanel.innerHTML = '<div class="websage-analysis-error">⚠️ Not enough content to analyze credibility</div>';
          return;
        }

        // Perform comprehensive credibility analysis
        const fakeNewsAnalysis = this.nlpProcessor.detectFakeNews(pageText);
        const biasAnalysis = this.nlpProcessor.detectBias(pageText);
        const qualityAnalysis = this.nlpProcessor.assessContentQuality(pageText);
        const readabilityAnalysis = this.nlpProcessor.analyzeReadability(pageText);

        // Calculate overall credibility score
        let credibilityScore = 100;
        credibilityScore -= fakeNewsAnalysis.suspicionScore * 3;
        credibilityScore -= biasAnalysis.biasScore * 2;
        credibilityScore = Math.max(0, Math.min(100, credibilityScore));

        let credibilityLevel = '';
        if (credibilityScore >= 80) credibilityLevel = 'High';
        else if (credibilityScore >= 60) credibilityLevel = 'Good';
        else if (credibilityScore >= 40) credibilityLevel = 'Moderate';
        else if (credibilityScore >= 20) credibilityLevel = 'Low';
        else credibilityLevel = 'Very Low';

        const credibilityColor = this.getQualityColor(credibilityScore);

        analysisPanel.innerHTML = `
          <div class="websage-analysis-results">
            <div class="websage-analysis-header">
              <h3>🏆 Page Credibility Assessment</h3>
              <button class="websage-analysis-close" onclick="this.parentElement.parentElement.parentElement.style.display='none'">✕</button>
            </div>
            
            <div class="websage-analysis-section">
              <div class="websage-credibility-score">
                <div class="websage-credibility-main">
                  <div class="websage-credibility-number" style="color: ${credibilityColor}">
                    ${credibilityScore}/100
                  </div>
                  <div class="websage-credibility-level">
                    ${credibilityLevel} Credibility
                  </div>
                </div>
              </div>
            </div>

            <div class="websage-analysis-grid">
              <div class="websage-analysis-card">
                <div class="websage-analysis-title">🛡️ Fake News Risk</div>
                <div class="websage-analysis-score" style="color: ${this.getRiskColor(fakeNewsAnalysis.riskLevel)}">
                  ${fakeNewsAnalysis.riskLevel.toUpperCase()}
                </div>
              </div>

              <div class="websage-analysis-card">
                <div class="websage-analysis-title">⚖️ Bias Level</div>
                <div class="websage-analysis-score" style="color: ${this.getSeverityColor(biasAnalysis.severity)}">
                  ${biasAnalysis.severity.toUpperCase()}
                </div>
              </div>

              <div class="websage-analysis-card">
                <div class="websage-analysis-title">📚 Readability</div>
                <div class="websage-analysis-score">
                  ${readabilityAnalysis.readingLevel}
                </div>
              </div>

              <div class="websage-analysis-card">
                <div class="websage-analysis-title">📊 Content Quality</div>
                <div class="websage-analysis-score" style="color: ${this.getQualityColor(qualityAnalysis.overallScore)}">
                  ${qualityAnalysis.qualityLevel}
                </div>
              </div>
            </div>

            <div class="websage-analysis-section">
              <div class="websage-analysis-subtitle">💡 Credibility Assessment</div>
              <div class="websage-credibility-assessment">
                ${this.getCredibilityAssessment(credibilityScore, fakeNewsAnalysis, biasAnalysis)}
              </div>
            </div>

            <div class="websage-analysis-section">
              <div class="websage-analysis-subtitle">🔍 Recommendations</div>
              <ul class="websage-analysis-recommendations">
                ${this.getCredibilityRecommendations(credibilityScore, fakeNewsAnalysis, biasAnalysis).map(rec =>
          `<li>${rec}</li>`
        ).join('')}
              </ul>
            </div>
          </div>
        `;

      } catch (error) {
        console.error('Credibility analysis error:', error);
        analysisPanel.innerHTML = '<div class="websage-analysis-error">❌ Credibility analysis failed. Please try again.</div>';
      }
    }

    getCredibilityAssessment(score, fakeNews, bias) {
      if (score >= 80) {
        return '✅ This page appears to be highly credible with minimal signs of misinformation or bias.';
      } else if (score >= 60) {
        return '👍 This page appears to be generally credible, but consider cross-referencing important claims.';
      } else if (score >= 40) {
        return '⚠️ This page shows some concerning patterns. Verify key information with reliable sources.';
      } else if (score >= 20) {
        return '🚨 This page has significant credibility issues. Exercise caution and fact-check thoroughly.';
      } else {
        return '❌ This page shows strong indicators of unreliable content. Avoid sharing without verification.';
      }
    }

    getCredibilityRecommendations(score, fakeNews, bias) {
      const recommendations = [];

      if (score < 60) {
        recommendations.push('🔍 Cross-reference information with multiple reliable sources');
      }

      if (fakeNews.riskLevel === 'high' || fakeNews.riskLevel === 'medium') {
        recommendations.push('🛡️ High risk of misinformation detected - verify claims independently');
      }

      if (bias.severity === 'high') {
        recommendations.push('⚖️ Strong bias detected - seek alternative perspectives');
      }

      if (score >= 80) {
        recommendations.push('✅ Content appears reliable, but always verify important information');
      }

      if (recommendations.length === 0) {
        recommendations.push('📚 Consider the source\'s reputation and track record');
        recommendations.push('🔗 Check if claims are supported by credible references');
      }

      return recommendations;
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
            <button id="websage-analyze" class="websage-btn-icon" title="Analyze Page">🔍</button>
            <button id="websage-clear" class="websage-btn-icon" title="Clear Chat">🗑️</button>
            <button id="websage-close" class="websage-btn-icon" title="Close">✕</button>
          </div>
        </div>
        <div class="websage-analysis" id="websage-analysis" style="display: none;"></div>
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
      const analyzeBtn = this.chatWindow.querySelector('#websage-analyze');
      const clearBtn = this.chatWindow.querySelector('#websage-clear');
      const closeBtn = this.chatWindow.querySelector('#websage-close');
      const providerSelect = this.chatWindow.querySelector('#websage-provider');

      // Set current provider
      providerSelect.value = this.settings.provider;

      // Send message
      sendBtn.addEventListener('click', () => this.sendMessage());

      // Analyze page
      analyzeBtn.addEventListener('click', () => this.analyzeCurrentPage());

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

      // Hide analysis panel
      const analysisPanel = this.chatWindow.querySelector('#websage-analysis');
      if (analysisPanel) {
        analysisPanel.style.display = 'none';
      }
    }

    // Analyze current page for fake news, bias, and quality
    async analyzeCurrentPage() {
      if (!this.nlpProcessor) {
        this.showError('NLP processor not available. Please refresh the page.');
        return;
      }

      const analysisPanel = this.chatWindow.querySelector('#websage-analysis');
      analysisPanel.style.display = 'block';
      analysisPanel.innerHTML = '<div class="websage-analysis-loading">🔍 Analyzing page content...</div>';

      try {
        // Get page text content
        const pageText = document.body.innerText || document.body.textContent || '';

        if (pageText.length < 100) {
          analysisPanel.innerHTML = '<div class="websage-analysis-error">⚠️ Not enough content to analyze</div>';
          return;
        }

        // Perform comprehensive analysis
        const analysis = this.nlpProcessor.analyzeContent(pageText);

        // Display results
        this.displayAnalysisResults(analysis);

      } catch (error) {
        console.error('Analysis error:', error);
        analysisPanel.innerHTML = '<div class="websage-analysis-error">❌ Analysis failed. Please try again.</div>';
      }
    }

    displayAnalysisResults(analysis) {
      const analysisPanel = this.chatWindow.querySelector('#websage-analysis');

      const fakeNewsColor = this.getRiskColor(analysis.fakeNews.riskLevel);
      const biasColor = this.getSeverityColor(analysis.bias.severity);
      const qualityColor = this.getQualityColor(analysis.quality.overallScore);

      analysisPanel.innerHTML = `
        <div class="websage-analysis-results">
          <div class="websage-analysis-header">
            <h3>📊 Page Analysis Results</h3>
            <button class="websage-analysis-close" onclick="this.parentElement.parentElement.parentElement.style.display='none'">✕</button>
          </div>
          
          <div class="websage-analysis-grid">
            <div class="websage-analysis-card">
              <div class="websage-analysis-title">🛡️ Fake News Detection</div>
              <div class="websage-analysis-score" style="color: ${fakeNewsColor}">
                ${analysis.fakeNews.riskLevel.toUpperCase()}
              </div>
              <div class="websage-analysis-detail">
                Score: ${analysis.fakeNews.suspicionScore}/20
              </div>
              <div class="websage-analysis-recommendation">
                ${analysis.fakeNews.recommendation}
              </div>
            </div>

            <div class="websage-analysis-card">
              <div class="websage-analysis-title">⚖️ Bias Detection</div>
              <div class="websage-analysis-score" style="color: ${biasColor}">
                ${analysis.bias.severity.toUpperCase()}
              </div>
              <div class="websage-analysis-detail">
                Types: ${analysis.bias.biasTypes.length > 0 ? analysis.bias.biasTypes.join(', ') : 'None detected'}
              </div>
            </div>

            <div class="websage-analysis-card">
              <div class="websage-analysis-title">📈 Content Quality</div>
              <div class="websage-analysis-score" style="color: ${qualityColor}">
                ${analysis.quality.overallScore}/100
              </div>
              <div class="websage-analysis-detail">
                Level: ${analysis.quality.qualityLevel}
              </div>
            </div>

            <div class="websage-analysis-card">
              <div class="websage-analysis-title">📚 Readability</div>
              <div class="websage-analysis-score">
                ${analysis.readability.readingLevel}
              </div>
              <div class="websage-analysis-detail">
                Flesch Score: ${analysis.readability.fleschScore}
              </div>
            </div>
          </div>

          <div class="websage-analysis-section">
            <div class="websage-analysis-subtitle">🎯 Key Topics</div>
            <div class="websage-analysis-tags">
              ${analysis.topics.slice(0, 5).map(topic =>
        `<span class="websage-analysis-tag">${topic.topic}</span>`
      ).join('')}
            </div>
          </div>

          <div class="websage-analysis-section">
            <div class="websage-analysis-subtitle">🔑 Keywords</div>
            <div class="websage-analysis-tags">
              ${analysis.keywords.slice(0, 8).map(keyword =>
        `<span class="websage-analysis-tag">${keyword.word} (${keyword.frequency})</span>`
      ).join('')}
            </div>
          </div>

          <div class="websage-analysis-section">
            <div class="websage-analysis-subtitle">💡 Recommendations</div>
            <ul class="websage-analysis-recommendations">
              ${analysis.quality.recommendations.map(rec =>
        `<li>${rec}</li>`
      ).join('')}
            </ul>
          </div>

          ${analysis.fakeNews.indicators.length > 0 ? `
          <div class="websage-analysis-section">
            <div class="websage-analysis-subtitle">⚠️ Detected Issues</div>
            <ul class="websage-analysis-issues">
              ${analysis.fakeNews.indicators.map(indicator =>
        `<li>${indicator}</li>`
      ).join('')}
            </ul>
          </div>
          ` : ''}
        </div>
      `;
    }

    getRiskColor(riskLevel) {
      switch (riskLevel) {
        case 'high': return '#e74c3c';
        case 'medium': return '#f39c12';
        case 'low-medium': return '#f1c40f';
        default: return '#27ae60';
      }
    }

    getSeverityColor(severity) {
      switch (severity) {
        case 'high': return '#e74c3c';
        case 'medium': return '#f39c12';
        default: return '#27ae60';
      }
    }

    getQualityColor(score) {
      if (score >= 80) return '#27ae60';
      if (score >= 60) return '#f39c12';
      return '#e74c3c';
    }

    async saveSettings() {
      chrome.storage.local.set({ webSageSettings: this.settings });
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

  // Initialize WebSage - NLP processor should be available since it's loaded as content script
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      console.log('🚀 WebSage initializing on DOMContentLoaded');
      console.log('🔍 Checking AdvancedNLPProcessor availability:', typeof window.AdvancedNLPProcessor);
      new WebSageChat();
    });
  } else {
    console.log('🚀 WebSage initializing immediately');
    console.log('🔍 Checking AdvancedNLPProcessor availability:', typeof window.AdvancedNLPProcessor);
    new WebSageChat();
  }
}