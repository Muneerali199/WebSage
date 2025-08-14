# Contributing to WebSage

Thank you for your interest in contributing to WebSage! We welcome contributions from the community and are excited to see what you'll bring to this project.

## 🤝 How to Contribute

### Reporting Issues
- Use the GitHub issue tracker to report bugs or request features
- Search existing issues before creating a new one
- Provide detailed information including steps to reproduce
- Include browser version, extension version, and relevant error messages

### Submitting Pull Requests
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes following our coding standards
4. Test your changes thoroughly
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 🛠️ Development Setup

### Prerequisites
- Chrome browser (latest version recommended)
- Basic knowledge of JavaScript, HTML, and CSS
- Understanding of Chrome Extension APIs

### Local Development
1. Clone the repository
```bash
git clone https://github.com/Xenonesis/WebSage.git
cd WebSage
```

2. Load the extension in Chrome
   - Open `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the project directory

3. Make your changes and test locally

### Testing
- Test on multiple websites and scenarios
- Verify all AI providers work correctly
- Check NLP features function as expected
- Ensure no console errors or warnings
- Test context menu integration
- Verify settings persistence

## 📝 Coding Standards

### JavaScript
- Use modern ES6+ syntax
- Follow consistent indentation (2 spaces)
- Use meaningful variable and function names
- Add comments for complex logic
- Handle errors gracefully

### Code Structure
- Keep functions focused and small
- Use modular design patterns
- Maintain separation of concerns
- Follow existing architectural patterns

### NLP Module Guidelines
- Ensure all NLP functions are performant
- Add proper error handling for edge cases
- Document algorithm choices and parameters
- Test with various text inputs and languages

## 🎯 Areas for Contribution

### High Priority
- **Performance Optimization**: Improve response times and memory usage
- **NLP Enhancements**: Better sentiment analysis and entity recognition
- **UI/UX Improvements**: Enhanced user interface and experience
- **Browser Compatibility**: Support for Firefox and Edge
- **Accessibility**: WCAG compliance and screen reader support

### Medium Priority
- **New AI Providers**: Integration with additional AI services
- **Language Support**: Internationalization and localization
- **Advanced Features**: Voice input, export functionality
- **Mobile Support**: Responsive design improvements

### Documentation
- Code documentation and inline comments
- User guides and tutorials
- API documentation
- Video demonstrations

## 🐛 Bug Reports

When reporting bugs, please include:
- **Description**: Clear description of the issue
- **Steps to Reproduce**: Detailed steps to recreate the bug
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Environment**: Browser version, OS, extension version
- **Screenshots**: If applicable
- **Console Logs**: Any relevant error messages

## 💡 Feature Requests

For feature requests, please provide:
- **Use Case**: Why this feature would be valuable
- **Description**: Detailed explanation of the proposed feature
- **Implementation Ideas**: Any thoughts on how it could work
- **Alternatives**: Other solutions you've considered

## 🔒 Security

If you discover a security vulnerability, please:
- **DO NOT** open a public issue
- Email security concerns privately
- Provide detailed information about the vulnerability
- Allow time for the issue to be addressed before disclosure

## 📋 Pull Request Guidelines

### Before Submitting
- Ensure your code follows the project's coding standards
- Add or update tests as needed
- Update documentation if required
- Verify all existing tests pass
- Check that your changes don't break existing functionality

### PR Description
- Clearly describe what your PR does
- Reference any related issues
- Include screenshots for UI changes
- List any breaking changes
- Mention if documentation updates are needed

### Review Process
- All PRs require review before merging
- Address feedback promptly and professionally
- Be open to suggestions and improvements
- Maintain a collaborative attitude

## 🏷️ Commit Message Guidelines

Use clear, descriptive commit messages:
```
feat: add sentiment analysis visualization
fix: resolve context menu positioning issue
docs: update installation instructions
refactor: improve NLP processor performance
test: add unit tests for entity recognition
```

### Commit Types
- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation changes
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

## 🌟 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- Special thanks in documentation

## 📞 Getting Help

- Join our community discussions
- Ask questions in GitHub issues
- Check existing documentation
- Review code examples in the repository

## 📄 License

By contributing to WebSage, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to WebSage! Your efforts help make this project better for everyone. 🚀