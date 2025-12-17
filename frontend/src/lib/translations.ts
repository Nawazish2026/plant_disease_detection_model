export type Language = 'en' | 'hi';

export const translations = {
    en: {
        // Navigation
        nav: {
            home: 'Home',
            detect: 'Detect Disease',
            chat: 'Chat',
            team: 'Team',
        },

        // Home page
        welcomeTitle: 'AI-Powered Plant Disease Detection',
        welcomeSubtitle: 'Early detection, healthier crops, better yields',
        getStarted: 'Get Started',
        learnMore: 'Learn More',

        // Features
        features: 'Features',
        accurateDetection: 'Accurate Detection',
        accurateDetectionDesc: '96% accuracy across 38 plant diseases',
        instantResults: 'Instant Results',
        instantResultsDesc: 'Get predictions in less than a second',
        expertAdvice: 'Expert Advice',
        expertAdviceDesc: 'AI-powered treatment recommendations',

        // Stats
        accuracy: 'Accuracy',
        diseases: 'Diseases Detected',
        plants: 'Plant Species',

        // Predict page
        uploadImage: 'Upload Image',
        useCamera: 'Use Camera',
        dragDrop: 'Drag and drop an image here, or click to select',
        analyzing: 'Analyzing...',
        analyzeImage: 'Analyze Image',

        // Results
        results: 'Results',
        plantName: 'Plant',
        diseaseName: 'Disease',
        confidence: 'Confidence',
        healthy: 'Healthy',
        recommendations: 'Treatment Recommendations',
        fungicides: 'Recommended Fungicides',
        organicOptions: 'Organic Options',
        precautions: 'Precautions',

        // Chat
        chat: {
            title: 'AI Assistant',
            context: 'Context',
            askAnything: 'Ask me anything about plant diseases and treatments!',
            chatPage: {
                title: 'AI Plant Disease Assistant',
                subtitle: 'Get expert advice on plant diseases and farming',
                welcome: 'Welcome to AgriVision AI Assistant!',
                welcomeDesc: 'Ask me anything about plant diseases, farming techniques, and crop management. I\'m here to help you 24/7.',
                features: [
                    'Identify and diagnose plant diseases',
                    'Get treatment recommendations',
                    'Learn about preventive measures',
                    'Understand farming best practices'
                ]
            },
            quickQuestions: 'Quick Questions',
            typeQuestion: 'Type your question here...'
        },
        chatWithAI: 'Chat with AI Assistant',
        askQuestion: 'Ask a question...',
        send: 'Send',
        typing: 'AI is typing...',

        // Errors
        error: 'Error',
        errorOccurred: 'An error occurred',
        tryAgain: 'Try Again',
        noImageSelected: 'Please select an image first',

        // Common
        loading: 'Loading...',
        cancel: 'Cancel',
        close: 'Close',
        save: 'Save',
        delete: 'Delete',
    },

    hi: {
        // Navigation
        nav: {
            home: 'होम',
            detect: 'रोग पहचानें',
            chat: 'चैट',
            team: 'टीम',
        },
        home: 'होम',
        detectDisease: 'रोग पहचानें',
        chatNav: 'चैट',
        team: 'टीम',

        // Home page
        welcomeTitle: 'AI-संचालित पौधे रोग पहचान',
        welcomeSubtitle: 'शीघ्र पहचान, स्वस्थ फसलें, बेहतर उपज',
        getStarted: 'शुरू करें',
        learnMore: 'और जानें',

        // Features
        features: 'विशेषताएं',
        accurateDetection: 'सटीक पहचान',
        accurateDetectionDesc: '38 पौधों की बीमारियों में 96% सटीकता',
        instantResults: 'तुरंत परिणाम',
        instantResultsDesc: 'एक सेकंड से कम में पूर्वानुमान प्राप्त करें',
        expertAdvice: 'विशेषज्ञ सलाह',
        expertAdviceDesc: 'AI-संचालित उपचार सिफारिशें',

        // Stats
        accuracy: 'सटीकता',
        diseases: 'रोग पहचाने गए',
        plants: 'पौधों की प्रजातियां',

        // Predict page
        uploadImage: 'तस्वीर अपलोड करें',
        useCamera: 'कैमरा उपयोग करें',
        dragDrop: 'यहां एक तस्वीर खींचें और छोड़ें, या चयन करने के लिए क्लिक करें',
        analyzing: 'विश्लेषण कर रहे हैं...',
        analyzeImage: 'तस्वीर का विश्लेषण करें',

        // Results
        results: 'परिणाम',
        plantName: 'पौधा',
        diseaseName: 'रोग',
        confidence: 'विश्वास',
        healthy: 'स्वस्थ',
        recommendations: 'उपचार की सिफारिशें',
        fungicides: 'अनुशंसित फफूंदनाशक',
        organicOptions: 'जैविक विकल्प',
        precautions: 'सावधानियां',

        // Chat
        chat: {
            title: 'AI सहायक',
            context: 'संदर्भ',
            askAnything: 'मुझसे पौधों की बीमारियों और उपचार के बारे में कुछ भी पूछें!',
            chatPage: {
                title: 'AI पौधे रोग सहायक',
                subtitle: 'पौधों की बीमारियों और खेती पर विशेषज्ञ सलाह प्राप्त करें',
                welcome: 'AgriVision AI सहायक में आपका स्वागत है!',
                welcomeDesc: 'मुझसे पौधों की बीमारियों, खेती की तकनीकों और फसल प्रबंधन के बारे में कुछ भी पूछें। मैं 24/7 आपकी मदद के लिए यहां हूं।',
                features: [
                    'पौधों की बीमारियों की पहचान और निदान',
                    'उपचार की सिफारिशें प्राप्त करें',
                    'निवारक उपायों के बारे में जानें',
                    'खेती के सर्वोत्तम अभ्यासों को समझें'
                ]
            },
            quickQuestions: 'त्वरित प्रश्न',
            typeQuestion: 'अपना प्रश्न यहां टाइप करें...'
        },
        chatWithAI: 'AI सहायक के साथ चैट करें',
        askQuestion: 'एक सवाल पूछें...',
        send: 'भेजें',
        typing: 'AI टाइप कर रहा है...',

        // Errors
        error: 'त्रुटि',
        errorOccurred: 'एक त्रुटि हुई',
        tryAgain: 'पुनः प्रयास करें',
        noImageSelected: 'कृपया पहले एक तस्वीर चुनें',

        // Common
        loading: 'लोड हो रहा है...',
        cancel: 'रद्द करें',
        close: 'बंद करें',
        save: 'सहेजें',
        delete: 'हटाएं',
    },
};

// Helper function to get translation
export function t(key: string, lang: Language = 'en'): string {
    const keys = key.split('.');
    let value: any = translations[lang];

    for (const k of keys) {
        value = value?.[k];
    }

    return value || key;
}
