# WebSage v2.0 - Advanced AI Browser Assistant with NLP

WebSage is a powerful Chrome browser extension that embeds an AI-powered chatbot assistant directly into any webpage. Enhanced with advanced Natural Language Processing (NLP) capabilities, sentiment analysis, conversation intelligence, and multi-modal processing for an unparalleled browsing experience.

## 🚀 New in v2.0

### Advanced NLP Features
- **Sentiment Analysis**: Real-time emotion detection with confidence scoring and visual indicators
- **Intent Classification**: Understands user intentions (questions, requests, commands, greetings)
- **Entity Recognition**: Extracts persons, organizations, locations, dates, URLs, emails, and technologies
- **Topic Modeling**: Identifies conversation themes and subjects using keyword-based analysis
- **Conversation Intelligence**: Tracks conversation flow, provides insights, and maintains context
- **Smart Context Enhancement**: NLP-powered page content analysis with importance scoring
- **Keyword Extraction**: Automatic identification of important terms with relevance ranking
- **Text Summarization**: Extractive summarization of long content with sentence scoring

### Enhanced User Experience
- **Context Menu Integration**: Right-click to explain, summarize, translate, or analyze selected text
- **Intelligent Typing Indicators**: Context-aware processing messages showing current NLP operations
- **Performance Metrics**: Real-time display of context processing, API response, and NLP analysis times
- **Memory System**: Persistent conversations with intelligent context retention and hash-based change detection
- **Smart Response Suggestions**: AI-powered conversation guidance based on intent and sentiment
- **Sentiment Indicators**: Visual feedback for detected emotions with confidence levels
- **Conversation Insights**: Track topics, entities, and emotional progression over time

### Improved AI Integration
- **Multi-Modal Processing**: Enhanced context understanding with NLP preprocessing and analysis
- **Conversation Flow Tracking**: Maintains conversation history with topic and sentiment context
- **Adaptive Responses**: AI responses tailored to detected sentiment, intent, and conversation history
- **Enhanced Error Handling**: Robust retry logic with exponential backoff and graceful degradation
- **Contextual Prompt Generation**: Dynamic prompt enhancement based on page content and conversation state
- **Parallel Processing**: Concurrent NLP analysis and API calls for optimal performance

## 🎯 Core Features

### AI Provider Support
- **OpenAI**: GPT-4o, GPT-4o-mini, GPT-4 Turbo, GPT-4, GPT-3.5 Turbo
- **Google Gemini**: Gemini 2.0 Flash (Experimental), Gemini 1.5 Pro, Gemini 1.5 Flash, Gemini 1.0 Pro
- **Mistral AI**: Mistral Large, Mistral Medium, Mistral Small, Mistral Tiny

### Context Processing Modes
- **Intelligent Mode**: NLP-enhanced context extraction with importance scoring and keyword analysis
- **Full Page Mode**: Complete page content analysis with metadata extraction
- **Minimal Mode**: Basic page information (title, URL, basic content)

### User Interface
- **Floating Chat Window**: Draggable, resizable, and responsive with auto-expanding input
- **Dark/Light Themes**: Customizable appearance with system preference detection
- **Keyboard Shortcuts**: `Alt+W` to toggle chat window, `Enter` to send, `Shift+Enter` for new line
- **Context Menu Actions**: Right-click integration for explain, summarize, translate, and sentiment analysis
- **Real-time Indicators**: Typing indicators, sentiment visualization, and performance metrics
- **Message Management**: Copy responses, clear chat, conversation history

## 📦 Installation

1. Clone this repository or download the source code
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the extension directory
5. The WebSage extension should now appear in your extensions list

## ⚙️ Setup

1. Click the WebSage extension icon in your browser toolbar
2. Choose your preferred AI provider
3. Enter your API key for the selected provider
4. Configure NLP features and processing settings
5. Set your preferred theme and context mode
6. Click "Save Settings" and "Test Connection"

## 🎮 Usage

### Basic Chat
- Press `Alt+W` on any webpage to toggle WebSage
- Type questions or requests in the chat input
- WebSage analyzes page content and provides contextual responses
- View real-time sentiment analysis and processing metrics

### Context Menu Actions
- **Right-click selected text** for quick actions:
  - **Explain this**: Get detailed explanations
  - **Summarize this**: Create concise summaries
  - **Translate this**: Translate to English
  - **Analyze sentiment**: Understand emotional tone

### Advanced Features
- **Conversation Memory**: Continues conversations across page visits
- **Smart Suggestions**: Get AI-powered response recommendations
- **Performance Insights**: Monitor processing times and NLP metrics
- **Topic Tracking**: See conversation themes and entity extraction

## 🔑 API Keys

Obtain API keys from your chosen providers:

- **OpenAI**: [OpenAI Platform](https://platform.openai.com/api-keys)
- **Google Gemini**: [Google AI Studio](https://makersuite.google.com/app/apikey)
- **Mistral AI**: [Mistral AI Platform](https://console.mistral.ai/)

## 🧠 NLP Capabilities

### Sentiment Analysis
- Detects positive, negative, and neutral emotions
- Confidence scoring for sentiment accuracy
- Real-time emotional context in conversations

### Intent Classification
- Identifies user intentions: questions, requests, commands, greetings
- Adapts AI responses based on detected intent
- Improves conversation flow and relevance

### Entity Recognition
- Extracts persons, organizations, locations, dates
- Identifies URLs, emails, phone numbers
- Recognizes technology keywords and terms

### Conversation Intelligence
- Tracks conversation topics and themes
- Maintains context across multiple interactions
- Provides insights into conversation patterns

## 🔒 Privacy & Security

- **Local Storage**: All API keys stored locally in browser
- **No Tracking**: Zero user analytics or data collection
- **HTTPS Only**: Secure communication with AI providers
- **Client-Side NLP**: All text processing happens locally
- **Memory Control**: User controls conversation retention

## 🛠️ Development

### Architecture
- **Manifest V3**: Modern Chrome extension standards
- **Modular Design**: Separate NLP, UI, and AI processing modules
- **Performance Optimized**: Efficient caching and processing
- **Error Resilient**: Graceful degradation and retry logic

### File Structure
```
├── manifest.json           # Extension configuration
├── background.js           # Service worker with context menu support
├── content.js             # Main chat functionality with NLP integration
├── nlp-processor.js       # Advanced NLP processing module
├── popup.html/js          # Enhanced settings interface
├── styles.css             # Responsive chat window styling
└── icons/                 # Extension icons
```

### Key Components
- **IntelligentContextProcessor**: Smart page content analysis
- **AdvancedNLPProcessor**: Comprehensive text analysis
- **WebSageChat**: Enhanced chat interface with NLP integration
- **WebSageBackground**: Context menu and message handling

## 🚀 Performance

### Optimizations
- **Intelligent Caching**: Context and NLP result caching
- **Lazy Loading**: NLP processor loaded on demand
- **Token Management**: Smart context size optimization
- **Parallel Processing**: Concurrent API calls and NLP analysis

### Metrics
- Real-time processing time display
- Context extraction performance monitoring
- NLP analysis timing and confidence scores
- Memory usage optimization

## 🔄 Changelog

### v2.0.0 - Enhanced NLP Release
- Added comprehensive NLP processing capabilities
- Implemented sentiment analysis and intent classification
- Enhanced context menu integration
- Improved conversation intelligence and memory
- Added performance monitoring and metrics
- Enhanced error handling and retry logic

### v1.0.0 - Initial Release
- Basic AI chat functionality
- Multi-provider support
- Context-aware responses
- Draggable chat interface

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests for any improvements.

## 📞 Support

For issues, feature requests, or questions, please open an issue on GitHub or contact our support team.