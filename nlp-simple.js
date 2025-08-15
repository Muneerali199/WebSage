// Simple NLP Processor for WebSage - Minimal Version
console.log('🔄 Loading Simple NLP Processor...');

class AdvancedNLPProcessor {
  constructor() {
    console.log('✨ AdvancedNLPProcessor constructor called');
    this.fakeNewsCache = new Map();
  }

  // Simple fake news detection
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

  // Simple bias detection
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
}

// Make it globally available
if (typeof window !== 'undefined') {
  window.AdvancedNLPProcessor = AdvancedNLPProcessor;
  console.log('🧠 AdvancedNLPProcessor loaded and available globally');
  console.log('🔍 Testing instantiation...');
  
  try {
    const testInstance = new AdvancedNLPProcessor();
    console.log('✅ Test instance created successfully');
  } catch (error) {
    console.error('❌ Failed to create test instance:', error);
  }
} else {
  console.log('⚠️ Window object not available');
}

console.log('📝 NLP Processor script completed');