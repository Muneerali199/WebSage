// Debug script to test WebSage fake news detection
console.log('🔧 Debug script loaded');

// Test 1: Check if NLP processor is available
function testNLPProcessor() {
    console.log('🧪 Testing NLP Processor...');

    if (typeof AdvancedNLPProcessor === 'undefined') {
        console.error('❌ AdvancedNLPProcessor not found');
        return false;
    }

    try {
        const nlp = new AdvancedNLPProcessor();
        console.log('✅ NLP Processor created successfully');

        // Test fake news detection
        const testText = "SHOCKING! You won't believe this AMAZING discovery!";
        const result = nlp.detectFakeNews(testText);

        console.log('✅ Fake news detection result:', result);
        return true;
    } catch (error) {
        console.error('❌ Error creating NLP processor:', error);
        return false;
    }
}

// Test 2: Check if WebSage is loaded
function testWebSage() {
    console.log('🧪 Testing WebSage...');

    if (typeof window.webSageHandleContextMenu === 'function') {
        console.log('✅ WebSage context menu handler found');
        return true;
    } else {
        console.error('❌ WebSage context menu handler not found');
        return false;
    }
}

// Test 3: Simulate fake news detection
function simulateFakeNewsDetection() {
    console.log('🧪 Simulating fake news detection...');

    const testText = "SHOCKING! You won't believe what doctors don't want you to know about this AMAZING miracle cure!";

    if (window.webSageHandleContextMenu) {
        try {
            window.webSageHandleContextMenu('check-fake-news', testText);
            console.log('✅ Fake news detection triggered');
        } catch (error) {
            console.error('❌ Error triggering fake news detection:', error);
        }
    } else {
        console.error('❌ WebSage not available for testing');
    }
}

// Run tests after a delay to ensure everything is loaded
setTimeout(() => {
    console.log('🔧 Running WebSage debug tests...');

    const nlpTest = testNLPProcessor();
    const webSageTest = testWebSage();

    if (nlpTest && webSageTest) {
        console.log('✅ All tests passed! Trying fake news detection...');
        simulateFakeNewsDetection();
    } else {
        console.log('❌ Some tests failed. Check the errors above.');
    }
}, 2000);

// Add a global test function
window.testFakeNewsDetection = simulateFakeNewsDetection;