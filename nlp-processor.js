// Advanced NLP Processing Module for WebSage
class AdvancedNLPProcessor {
  constructor() {
    this.sentimentCache = new Map();
    this.entityCache = new Map();
    this.intentCache = new Map();
    this.conversationContext = {
      topics: [],
      sentiment: 'neutral',
      entities: [],
      userPreferences: {},
      conversationFlow: []
    };
  }

  // Sentiment Analysis using lexicon-based approach
  analyzeSentiment(text) {
    const cacheKey = this.simpleHash(text);
    if (this.sentimentCache.has(cacheKey)) {
      return this.sentimentCache.get(cacheKey);
    }

    const positiveWords = [
      'good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'awesome', 'love', 'like', 'enjoy',
      'happy', 'pleased', 'satisfied', 'perfect', 'brilliant', 'outstanding', 'superb', 'marvelous', 'terrific',
      'delighted', 'thrilled', 'excited', 'impressed', 'grateful', 'thankful', 'appreciate', 'helpful', 'useful'
    ];

    const negativeWords = [
      'bad', 'terrible', 'awful', 'horrible', 'hate', 'dislike', 'annoying', 'frustrating', 'disappointed',
      'angry', 'upset', 'sad', 'worried', 'concerned', 'problem', 'issue', 'error', 'wrong', 'broken',
      'difficult', 'hard', 'impossible', 'useless', 'worthless', 'stupid', 'ridiculous', 'waste', 'fail'
    ];

    const words = text.toLowerCase().split(/\W+/);
    let positiveScore = 0;
    let negativeScore = 0;

    words.forEach(word => {
      if (positiveWords.includes(word)) positiveScore++;
      if (negativeWords.includes(word)) negativeScore++;
    });

    let sentiment = 'neutral';
    let confidence = 0.5;

    if (positiveScore > negativeScore) {
      sentiment = 'positive';
      confidence = Math.min(0.9, 0.5 + (positiveScore - negativeScore) * 0.1);
    } else if (negativeScore > positiveScore) {
      sentiment = 'negative';
      confidence = Math.min(0.9, 0.5 + (negativeScore - positiveScore) * 0.1);
    }

    const result = { sentiment, confidence, positiveScore, negativeScore };
    this.sentimentCache.set(cacheKey, result);
    return result;
  }

  // Named Entity Recognition (basic implementation)
  extractEntities(text) {
    const cacheKey = this.simpleHash(text);
    if (this.entityCache.has(cacheKey)) {
      return this.entityCache.get(cacheKey);
    }

    const entities = {
      persons: [],
      organizations: [],
      locations: [],
      dates: [],
      urls: [],
      emails: [],
      numbers: [],
      technologies: []
    };

    // URL extraction
    const urlRegex = /https?:\/\/[^\s]+/g;
    entities.urls = [...(text.match(urlRegex) || [])];

    // Email extraction
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    entities.emails = [...(text.match(emailRegex) || [])];

    // Number extraction
    const numberRegex = /\b\d+(?:\.\d+)?\b/g;
    entities.numbers = [...(text.match(numberRegex) || [])];

    // Date extraction (basic patterns)
    const dateRegex = /\b(?:\d{1,2}\/\d{1,2}\/\d{4}|\d{4}-\d{2}-\d{2}|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* \d{1,2},? \d{4})\b/gi;
    entities.dates = [...(text.match(dateRegex) || [])];

    // Technology keywords
    const techKeywords = [
      'javascript', 'python', 'java', 'react', 'vue', 'angular', 'node', 'express', 'mongodb', 'mysql',
      'postgresql', 'redis', 'docker', 'kubernetes', 'aws', 'azure', 'gcp', 'api', 'rest', 'graphql',
      'html', 'css', 'typescript', 'php', 'ruby', 'go', 'rust', 'swift', 'kotlin', 'flutter', 'react native'
    ];

    const words = text.toLowerCase().split(/\W+/);
    entities.technologies = words.filter(word => techKeywords.includes(word));

    // Capitalized words (potential proper nouns)
    const capitalizedRegex = /\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\b/g;
    const capitalizedWords = [...(text.match(capitalizedRegex) || [])];
    
    // Simple heuristics for classification
    capitalizedWords.forEach(word => {
      if (word.includes('Inc') || word.includes('Corp') || word.includes('LLC') || word.includes('Ltd')) {
        entities.organizations.push(word);
      } else if (word.length > 10 || word.split(' ').length > 2) {
        entities.organizations.push(word);
      } else {
        entities.persons.push(word);
      }
    });

    this.entityCache.set(cacheKey, entities);
    return entities;
  }

  // Intent Classification
  classifyIntent(text) {
    const cacheKey = this.simpleHash(text);
    if (this.intentCache.has(cacheKey)) {
      return this.intentCache.get(cacheKey);
    }

    const intents = {
      question: ['what', 'how', 'why', 'when', 'where', 'who', 'which', 'can you', 'could you', 'would you', '?'],
      request: ['please', 'can you', 'could you', 'would you', 'help me', 'show me', 'tell me', 'explain'],
      command: ['do', 'make', 'create', 'generate', 'build', 'write', 'find', 'search', 'analyze'],
      greeting: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'],
      gratitude: ['thank', 'thanks', 'appreciate', 'grateful'],
      complaint: ['problem', 'issue', 'error', 'bug', 'wrong', 'broken', 'not working'],
      compliment: ['good', 'great', 'excellent', 'amazing', 'perfect', 'love it', 'awesome']
    };

    const lowerText = text.toLowerCase();
    const scores = {};

    Object.keys(intents).forEach(intent => {
      scores[intent] = 0;
      intents[intent].forEach(keyword => {
        if (lowerText.includes(keyword)) {
          scores[intent]++;
        }
      });
    });

    const maxScore = Math.max(...Object.values(scores));
    const detectedIntent = Object.keys(scores).find(intent => scores[intent] === maxScore) || 'general';
    const confidence = maxScore > 0 ? Math.min(0.9, maxScore * 0.3) : 0.1;

    const result = { intent: detectedIntent, confidence, scores };
    this.intentCache.set(cacheKey, result);
    return result;
  }

  // Topic Modeling (simple keyword-based)
  extractTopics(text) {
    const topicKeywords = {
      technology: ['code', 'programming', 'software', 'development', 'tech', 'computer', 'algorithm', 'data'],
      business: ['company', 'business', 'market', 'sales', 'revenue', 'profit', 'strategy', 'management'],
      science: ['research', 'study', 'experiment', 'analysis', 'theory', 'hypothesis', 'data', 'results'],
      education: ['learn', 'study', 'course', 'education', 'school', 'university', 'student', 'teacher'],
      health: ['health', 'medical', 'doctor', 'patient', 'treatment', 'medicine', 'wellness', 'fitness'],
      finance: ['money', 'investment', 'bank', 'financial', 'economy', 'stock', 'trading', 'budget'],
      entertainment: ['movie', 'music', 'game', 'entertainment', 'fun', 'hobby', 'sport', 'art']
    };

    const lowerText = text.toLowerCase();
    const topicScores = {};

    Object.keys(topicKeywords).forEach(topic => {
      topicScores[topic] = 0;
      topicKeywords[topic].forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
        const matches = lowerText.match(regex);
        if (matches) {
          topicScores[topic] += matches.length;
        }
      });
    });

    return Object.entries(topicScores)
      .filter(([topic, score]) => score > 0)
      .sort(([,a], [,b]) => b - a)
      .map(([topic, score]) => ({ topic, score }));
  }

  // Conversation Context Management
  updateConversationContext(userMessage, aiResponse) {
    // Analyze user message
    const sentiment = this.analyzeSentiment(userMessage);
    const entities = this.extractEntities(userMessage);
    const intent = this.classifyIntent(userMessage);
    const topics = this.extractTopics(userMessage + ' ' + aiResponse);

    // Update context
    this.conversationContext.sentiment = sentiment.sentiment;
    this.conversationContext.entities = [...new Set([...this.conversationContext.entities, ...Object.values(entities).flat()])];
    this.conversationContext.topics = topics.slice(0, 5); // Keep top 5 topics

    // Track conversation flow
    this.conversationContext.conversationFlow.push({
      timestamp: Date.now(),
      userIntent: intent.intent,
      sentiment: sentiment.sentiment,
      topics: topics.map(t => t.topic),
      entities: Object.values(entities).flat()
    });

    // Keep only last 10 conversation turns
    if (this.conversationContext.conversationFlow.length > 10) {
      this.conversationContext.conversationFlow = this.conversationContext.conversationFlow.slice(-10);
    }

    return {
      sentiment,
      entities,
      intent,
      topics,
      context: this.conversationContext
    };
  }

  // Generate contextual prompt enhancement
  generateContextualPrompt(userMessage, pageContext) {
    const analysis = this.updateConversationContext(userMessage, '');
    
    let enhancedPrompt = userMessage;
    
    // Add sentiment context
    if (analysis.sentiment.confidence > 0.7) {
      enhancedPrompt += `\n\n[User seems ${analysis.sentiment.sentiment}]`;
    }

    // Add intent context
    if (analysis.intent.confidence > 0.5) {
      enhancedPrompt += `\n[Intent: ${analysis.intent.intent}]`;
    }

    // Add topic context
    if (analysis.topics.length > 0) {
      enhancedPrompt += `\n[Topics: ${analysis.topics.map(t => t.topic).join(', ')}]`;
    }

    // Add conversation history context
    if (this.conversationContext.conversationFlow.length > 1) {
      const recentTopics = [...new Set(this.conversationContext.conversationFlow
        .slice(-3)
        .flatMap(turn => turn.topics))];
      if (recentTopics.length > 0) {
        enhancedPrompt += `\n[Recent conversation topics: ${recentTopics.join(', ')}]`;
      }
    }

    return enhancedPrompt;
  }

  // Smart response suggestions
  generateResponseSuggestions(userMessage, conversationHistory) {
    const intent = this.classifyIntent(userMessage);
    const sentiment = this.analyzeSentiment(userMessage);
    
    const suggestions = [];

    switch (intent.intent) {
      case 'question':
        suggestions.push("Let me help you understand that better...");
        suggestions.push("Based on the page content, here's what I found...");
        break;
      case 'request':
        suggestions.push("I'd be happy to help you with that.");
        suggestions.push("Let me analyze this for you...");
        break;
      case 'complaint':
        suggestions.push("I understand your frustration. Let me see how I can help...");
        suggestions.push("That does sound problematic. Here's what I suggest...");
        break;
      case 'compliment':
        suggestions.push("Thank you! I'm glad I could help.");
        suggestions.push("I appreciate your feedback!");
        break;
    }

    return suggestions;
  }

  // Text summarization (extractive)
  summarizeText(text, maxSentences = 3) {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 20);
    if (sentences.length <= maxSentences) return text;

    // Score sentences based on word frequency and position
    const words = text.toLowerCase().split(/\W+/).filter(w => w.length > 3);
    const wordFreq = {};
    words.forEach(word => {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    });

    const sentenceScores = sentences.map((sentence, index) => {
      const sentenceWords = sentence.toLowerCase().split(/\W+/);
      const score = sentenceWords.reduce((sum, word) => sum + (wordFreq[word] || 0), 0);
      const positionScore = sentences.length - index; // Earlier sentences get higher scores
      return { sentence: sentence.trim(), score: score + positionScore, index };
    });

    return sentenceScores
      .sort((a, b) => b.score - a.score)
      .slice(0, maxSentences)
      .sort((a, b) => a.index - b.index)
      .map(s => s.sentence)
      .join('. ') + '.';
  }

  // Keyword extraction
  extractKeywords(text, maxKeywords = 10) {
    const stopWords = new Set([
      'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them'
    ]);

    const words = text.toLowerCase()
      .split(/\W+/)
      .filter(word => word.length > 3 && !stopWords.has(word));

    const wordFreq = {};
    words.forEach(word => {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    });

    return Object.entries(wordFreq)
      .sort(([,a], [,b]) => b - a)
      .slice(0, maxKeywords)
      .map(([word, freq]) => ({ word, frequency: freq }));
  }

  // Utility function for hashing
  simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString();
  }

  // Clear caches to free memory
  clearCaches() {
    this.sentimentCache.clear();
    this.entityCache.clear();
    this.intentCache.clear();
  }

  // Get conversation insights
  getConversationInsights() {
    const flow = this.conversationContext.conversationFlow;
    if (flow.length === 0) return null;

    const sentiments = flow.map(turn => turn.sentiment);
    const intents = flow.map(turn => turn.userIntent);
    const allTopics = flow.flatMap(turn => turn.topics);

    const sentimentTrend = sentiments.slice(-3);
    const commonIntents = [...new Set(intents)];
    const topTopics = [...new Set(allTopics)].slice(0, 3);

    return {
      conversationLength: flow.length,
      sentimentTrend,
      commonIntents,
      topTopics,
      currentSentiment: this.conversationContext.sentiment
    };
  }
}