// WebSage Popup Script
class WebSagePopup {
  constructor() {
    this.settings = {};
    this.init();
  }

  async init() {
    await this.loadSettings();
    this.setupUI();
    this.setupEventListeners();
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

  setupUI() {
    // Set current values
    document.getElementById('provider').value = this.settings.provider;
    document.getElementById('contextEnabled').checked = this.settings.contextEnabled;
    document.getElementById('memoryEnabled').checked = this.settings.memoryEnabled;
    document.getElementById('contextMode').value = this.settings.contextMode;
    document.getElementById('maxTokens').value = this.settings.maxTokens;
    document.getElementById('theme').value = this.settings.theme;
    
    // Set NLP settings
    document.getElementById('nlpEnabled').checked = this.settings.nlpEnabled;
    document.getElementById('sentimentAnalysis').checked = this.settings.sentimentAnalysis;
    document.getElementById('intentClassification').checked = this.settings.intentClassification;
    document.getElementById('conversationInsights').checked = this.settings.conversationInsights;
    
    // Set API key for current provider
    const apiKey = this.settings.apiKeys[this.settings.provider] || '';
    document.getElementById('apiKey').value = apiKey;
    
    // Update model options based on provider
    this.updateModelOptions();
  }

  setupEventListeners() {
    // Provider change
    document.getElementById('provider').addEventListener('change', (e) => {
      this.settings.provider = e.target.value;
      this.updateModelOptions();
      this.updateApiKeyField();
    });

    // API key toggle visibility
    document.getElementById('toggleApiKey').addEventListener('click', () => {
      const apiKeyInput = document.getElementById('apiKey');
      const toggleBtn = document.getElementById('toggleApiKey');
      
      if (apiKeyInput.type === 'password') {
        apiKeyInput.type = 'text';
        toggleBtn.textContent = '🙈';
      } else {
        apiKeyInput.type = 'password';
        toggleBtn.textContent = '👁️';
      }
    });

    // Save settings
    document.getElementById('saveSettings').addEventListener('click', () => {
      this.saveSettings();
    });

    // Test connection
    document.getElementById('testConnection').addEventListener('click', () => {
      this.testConnection();
    });
  }

  updateModelOptions() {
    const modelSelect = document.getElementById('model');
    const provider = this.settings.provider;
    
    // Clear existing options
    modelSelect.innerHTML = '';
    
    let models = [];
    switch (provider) {
      case 'openai':
        models = [
          { value: 'gpt-4o', text: 'GPT-4o (Best)' },
          { value: 'gpt-4-turbo', text: 'GPT-4 Turbo' },
          { value: 'gpt-4', text: 'GPT-4' },
          { value: 'gpt-3.5-turbo', text: 'GPT-3.5 Turbo' }
        ];
        break;
      case 'gemini':
        models = [
          { value: 'gemini-2.0-flash-exp', text: 'Gemini 2.0 Flash (Best)' },
          { value: 'gemini-1.5-pro', text: 'Gemini 1.5 Pro' },
          { value: 'gemini-1.5-flash', text: 'Gemini 1.5 Flash' },
          { value: 'gemini-1.0-pro', text: 'Gemini 1.0 Pro' }
        ];
        break;
      case 'mistral':
        models = [
          { value: 'mistral-large-latest', text: 'Mistral Large (Best)' },
          { value: 'mistral-medium-latest', text: 'Mistral Medium' },
          { value: 'mistral-small-latest', text: 'Mistral Small' },
          { value: 'mistral-tiny', text: 'Mistral Tiny' }
        ];
        break;
    }
    
    models.forEach(model => {
      const option = document.createElement('option');
      option.value = model.value;
      option.textContent = model.text;
      modelSelect.appendChild(option);
    });
    
    // Set current model or default to first option
    modelSelect.value = this.settings.model || models[0].value;
  }

  updateApiKeyField() {
    const apiKey = this.settings.apiKeys[this.settings.provider] || '';
    document.getElementById('apiKey').value = apiKey;
  }

  async saveSettings() {
    // Collect form data
    this.settings.provider = document.getElementById('provider').value;
    this.settings.model = document.getElementById('model').value;
    this.settings.contextEnabled = document.getElementById('contextEnabled').checked;
    this.settings.memoryEnabled = document.getElementById('memoryEnabled').checked;
    this.settings.contextMode = document.getElementById('contextMode').value;
    this.settings.maxTokens = parseInt(document.getElementById('maxTokens').value);
    this.settings.theme = document.getElementById('theme').value;
    
    // Collect NLP settings
    this.settings.nlpEnabled = document.getElementById('nlpEnabled').checked;
    this.settings.sentimentAnalysis = document.getElementById('sentimentAnalysis').checked;
    this.settings.intentClassification = document.getElementById('intentClassification').checked;
    this.settings.conversationInsights = document.getElementById('conversationInsights').checked;
    
    // Save API key for current provider
    const apiKey = document.getElementById('apiKey').value.trim();
    if (apiKey) {
      this.settings.apiKeys[this.settings.provider] = apiKey;
    }

    try {
      await chrome.storage.local.set({ webSageSettings: this.settings });
      this.showStatus('Settings saved successfully!', 'success');
    } catch (error) {
      this.showStatus('Failed to save settings: ' + error.message, 'error');
    }
  }

  async testConnection() {
    const apiKey = document.getElementById('apiKey').value.trim();
    const provider = this.settings.provider;

    if (!apiKey) {
      this.showStatus('Please enter an API key first', 'error');
      return;
    }

    this.showStatus('Testing connection...', 'info');

    try {
      let isValid = false;
      
      switch (provider) {
        case 'openai':
          isValid = await this.testOpenAI(apiKey);
          break;
        case 'gemini':
          isValid = await this.testGemini(apiKey);
          break;
        case 'mistral':
          isValid = await this.testMistral(apiKey);
          break;
      }

      if (isValid) {
        this.showStatus('Connection successful!', 'success');
      } else {
        this.showStatus('Connection failed. Please check your API key.', 'error');
      }
    } catch (error) {
      this.showStatus('Connection test failed: ' + error.message, 'error');
    }
  }

  async testOpenAI(apiKey) {
    const response = await fetch('https://api.openai.com/v1/models', {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });
    return response.ok;
  }

  async testGemini(apiKey) {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    return response.ok;
  }

  async testMistral(apiKey) {
    const response = await fetch('https://api.mistral.ai/v1/models', {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });
    return response.ok;
  }

  showStatus(message, type) {
    const statusDiv = document.getElementById('status');
    statusDiv.textContent = message;
    statusDiv.className = `status ${type}`;
    statusDiv.style.display = 'block';

    // Hide after 3 seconds for success messages
    if (type === 'success') {
      setTimeout(() => {
        statusDiv.style.display = 'none';
      }, 3000);
    }
  }
}

// Initialize popup when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new WebSagePopup();
});