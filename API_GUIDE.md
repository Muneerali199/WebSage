<div align="center">

# 🔑 WebSage API Guide

### *Complete guide to AI provider integration*

[![OpenAI](https://img.shields.io/badge/OpenAI-supported-green.svg)](https://openai.com)
[![Gemini](https://img.shields.io/badge/Gemini-supported-blue.svg)](https://ai.google.dev)
[![Mistral](https://img.shields.io/badge/Mistral-supported-purple.svg)](https://mistral.ai)

*Everything you need to know about setting up and using AI providers with WebSage*

[🔥 OpenAI](#-openai-setup) • [💎 Gemini](#-google-gemini-setup) • [🚀 Mistral](#-mistral-ai-setup) • [💰 Cost Guide](#-cost-comparison) • [🔧 Troubleshooting](#-troubleshooting)

</div>

---

## 🔥 OpenAI Setup

### **📋 Account Creation & Setup**

<table>
<tr>
<td width="50%">

**🌐 Getting Started**
1. Visit [platform.openai.com](https://platform.openai.com)
2. Sign up or log in to your account
3. Complete phone verification
4. Add payment method for API access

</td>
<td width="50%">

**💳 Billing Setup**
- **Free Tier**: $5 credit for new users
- **Pay-as-you-go**: Charges based on usage
- **Usage Limits**: Set monthly spending limits
- **Monitoring**: Track usage in dashboard

</td>
</tr>
</table>

### **🔑 API Key Generation**

<details>
<summary><strong>📝 Step-by-step Key Creation</strong></summary>

1. **Navigate to API Keys**
   - Go to [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
   - Click "Create new secret key"

2. **Configure Key Settings**
   - **Name**: "WebSage Extension" (or your preference)
   - **Permissions**: Default (full access) is fine
   - **Project**: Select your project or use default

3. **Copy & Store Securely**
   - **⚠️ Important**: Copy the key immediately
   - **🔒 Security**: Store in password manager
   - **🚫 Never share**: Keep your key private

4. **Add to WebSage**
   - Open WebSage settings
   - Select "OpenAI" as provider
   - Paste your API key
   - Click "Test Connection"

</details>

### **🤖 Model Selection Guide**

| Model | Best For | Speed | Cost | Context |
|-------|----------|-------|------|---------|
| **GPT-4o** | Complex reasoning, latest features | Fast | $$$ | 128k tokens |
| **GPT-4o-mini** | General use, cost-effective | Very Fast | $ | 128k tokens |
| **GPT-4 Turbo** | Advanced tasks, large context | Medium | $$$$ | 128k tokens |
| **GPT-4** | Premium quality responses | Slow | $$$$$ | 8k tokens |
| **GPT-3.5 Turbo** | Simple tasks, budget-friendly | Very Fast | $ | 16k tokens |

**💡 Recommendations:**
- **🏆 Best Overall**: GPT-4o-mini (great balance of speed, cost, and quality)
- **🧠 Most Advanced**: GPT-4o (latest features and capabilities)
- **💰 Most Economical**: GPT-3.5 Turbo (lowest cost option)

---

## 💎 Google Gemini Setup

### **📋 Account & Project Setup**

<table>
<tr>
<td width="50%">

**🌐 Getting Started**
1. Visit [ai.google.dev](https://ai.google.dev)
2. Sign in with Google account
3. Accept terms of service
4. Create or select a project

</td>
<td width="50%">

**💳 Billing Information**
- **Free Tier**: Generous free quota
- **Rate Limits**: Requests per minute limits
- **Paid Tier**: Higher limits and priority
- **Monitoring**: Google Cloud Console

</td>
</tr>
</table>

### **🔑 API Key Generation**

<details>
<summary><strong>📝 Step-by-step Key Creation</strong></summary>

1. **Access Google AI Studio**
   - Go to [makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
   - Ensure you're signed in

2. **Create API Key**
   - Click "Create API Key"
   - Select your Google Cloud project
   - Choose "Create API key in existing project"

3. **Configure & Secure**
   - **Restrictions**: Consider adding IP/domain restrictions
   - **Scope**: API key will have access to Gemini API
   - **Copy**: Save the generated key securely

4. **Add to WebSage**
   - Open WebSage settings
   - Select "Google Gemini" as provider
   - Paste your API key
   - Test the connection

</details>

### **🤖 Model Selection Guide**

| Model | Best For | Speed | Features | Context |
|-------|----------|-------|----------|---------|
| **Gemini 2.0 Flash** | Experimental features | Very Fast | Latest capabilities | 1M tokens |
| **Gemini 1.5 Pro** | Complex reasoning | Medium | Balanced performance | 2M tokens |
| **Gemini 1.5 Flash** | Quick responses | Very Fast | Speed optimized | 1M tokens |
| **Gemini 1.0 Pro** | Stable production use | Fast | Reliable & tested | 32k tokens |

**💡 Recommendations:**
- **🏆 Best Overall**: Gemini 1.5 Pro (excellent balance)
- **⚡ Fastest**: Gemini 1.5 Flash (speed priority)
- **🔬 Experimental**: Gemini 2.0 Flash (cutting-edge features)

---

## 🚀 Mistral AI Setup

### **📋 Account Creation**

<table>
<tr>
<td width="50%">

**🌐 Getting Started**
1. Visit [console.mistral.ai](https://console.mistral.ai)
2. Create account or sign in
3. Verify email address
4. Complete profile setup

</td>
<td width="50%">

**💳 Billing Setup**
- **Free Credits**: Initial credits provided
- **Pay-per-use**: Competitive pricing
- **European Focus**: GDPR compliant
- **Transparent Costs**: Clear pricing model

</td>
</tr>
</table>

### **🔑 API Key Generation**

<details>
<summary><strong>📝 Step-by-step Key Creation</strong></summary>

1. **Navigate to API Keys**
   - Log in to Mistral Console
   - Go to "API Keys" section
   - Click "Create new key"

2. **Configure Key**
   - **Name**: "WebSage Extension"
   - **Permissions**: Default API access
   - **Expiration**: Set if desired

3. **Security & Storage**
   - Copy the generated key immediately
   - Store securely (password manager recommended)
   - Never commit to version control

4. **Add to WebSage**
   - Open WebSage settings
   - Select "Mistral AI" as provider
   - Enter your API key
   - Verify connection works

</details>

### **🤖 Model Selection Guide**

| Model | Best For | Speed | Cost | Specialization |
|-------|----------|-------|------|----------------|
| **Mistral Large** | Complex reasoning | Medium | $$$ | Advanced tasks |
| **Mistral Medium** | Balanced performance | Fast | $$ | General use |
| **Mistral Small** | Quick responses | Very Fast | $ | Simple tasks |
| **Mistral Tiny** | Ultra-fast queries | Ultra Fast | $ | Basic questions |

**💡 Recommendations:**
- **🏆 Best Overall**: Mistral Medium (great balance)
- **🧠 Most Capable**: Mistral Large (complex reasoning)
- **⚡ Fastest**: Mistral Tiny (instant responses)

---

## 💰 Cost Comparison

### **📊 Pricing Overview**

<table>
<tr>
<td align="center" width="33%">

**🔥 OpenAI**
- **GPT-4o-mini**: $0.15/1M tokens
- **GPT-4o**: $2.50/1M tokens
- **GPT-4 Turbo**: $10/1M tokens
- **Free Tier**: $5 credit

</td>
<td align="center" width="33%">

**💎 Google Gemini**
- **Gemini 1.5 Flash**: $0.075/1M tokens
- **Gemini 1.5 Pro**: $1.25/1M tokens
- **Free Tier**: 15 requests/minute
- **Rate Limits**: Generous quotas

</td>
<td align="center" width="33%">

**🚀 Mistral AI**
- **Mistral Tiny**: $0.14/1M tokens
- **Mistral Small**: $0.2/1M tokens
- **Mistral Medium**: $0.6/1M tokens
- **Mistral Large**: $2/1M tokens

</td>
</tr>
</table>

### **💡 Cost Optimization Tips**

<details>
<summary><strong>💰 Save Money on API Usage</strong></summary>

**Context Management:**
- Use "Minimal" context mode for simple questions
- Clear conversation history regularly
- Avoid unnecessary page content inclusion

**Model Selection:**
- Use cheaper models for basic tasks
- Reserve premium models for complex reasoning
- Test different models to find best value

**Usage Monitoring:**
- Set up billing alerts
- Monitor usage dashboards
- Track costs per conversation

**Efficient Prompting:**
- Be specific and concise
- Avoid repetitive questions
- Use context menu for quick tasks

</details>

---

## 🔧 Troubleshooting

### **❌ Common API Issues**

<details>
<summary><strong>🔑 Authentication Problems</strong></summary>

**"Invalid API Key" Error:**
- Verify key is copied correctly (no extra spaces)
- Check if key has been revoked or expired
- Ensure account has proper permissions
- Try regenerating the API key

**"Quota Exceeded" Error:**
- Check your usage limits in provider dashboard
- Verify billing information is up to date
- Consider upgrading to paid tier
- Wait for quota reset (if on free tier)

</details>

<details>
<summary><strong>🌐 Connection Issues</strong></summary>

**"Connection Failed" Error:**
- Check internet connectivity
- Verify provider service status
- Try different network (mobile hotspot)
- Check firewall/proxy settings

**"Timeout" Errors:**
- Reduce context size in settings
- Try a faster model
- Check network stability
- Retry after a few moments

</details>

<details>
<summary><strong>⚡ Performance Issues</strong></summary>

**Slow Response Times:**
- Switch to faster model (e.g., GPT-4o-mini)
- Use minimal context mode
- Clear browser cache
- Check provider status page

**High Costs:**
- Monitor token usage in settings
- Use appropriate context modes
- Choose cost-effective models
- Set usage alerts

</details>

### **🆘 Getting Help**

<table>
<tr>
<td align="center" width="25%">

**🔥 OpenAI Support**
[help.openai.com](https://help.openai.com)
*Official OpenAI documentation*

</td>
<td align="center" width="25%">

**💎 Gemini Support**
[ai.google.dev/docs](https://ai.google.dev/docs)
*Google AI documentation*

</td>
<td align="center" width="25%">

**🚀 Mistral Support**
[docs.mistral.ai](https://docs.mistral.ai)
*Mistral AI documentation*

</td>
<td align="center" width="25%">

**🤝 WebSage Community**
[GitHub Discussions](https://github.com/Xenonesis/WebSage/discussions)
*Community support*

</td>
</tr>
</table>

---

## 🎯 Best Practices

### **🔒 Security Guidelines**

<table>
<tr>
<td width="50%">

**🔑 API Key Security**
- Never share your API keys
- Use environment variables in development
- Rotate keys regularly
- Monitor usage for anomalies

</td>
<td width="50%">

**💰 Cost Management**
- Set spending limits
- Monitor usage regularly
- Use appropriate models for tasks
- Implement usage alerts

</td>
</tr>
</table>

### **⚡ Performance Optimization**

<details>
<summary><strong>🚀 Speed & Efficiency Tips</strong></summary>

**Model Selection:**
- Use fastest models for simple tasks
- Reserve powerful models for complex reasoning
- Test different models for your use cases

**Context Management:**
- Choose appropriate context modes
- Clear unnecessary conversation history
- Use page-specific contexts when relevant

**Caching:**
- Enable WebSage's intelligent caching
- Avoid repeating identical requests
- Use context menu for quick analysis

</details>

---

<div align="center">

### 🌟 **Ready to Start?**

*Choose your preferred AI provider and start experiencing the power of WebSage!*

[📦 Installation Guide](INSTALLATION.md) • [📖 User Guide](README.md) • [🤝 Get Support](https://github.com/Xenonesis/WebSage/discussions)

**Transform your browsing experience today! 🚀**

</div>