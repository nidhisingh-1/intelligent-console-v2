// Dummy call data for fallback when API fails
export const dummyCalls = [
  {
    id: "call-1",
    customerName: "John Smith",
    customerInitials: "JS",
    phoneNumber: "+1-555-0123",
    callType: "Support",
    callLength: "5:23",
    timestamp: "2024-01-15T10:30:00Z",
    callPriority: "High",
    status: "In Progress",
    recordingUrl: "/audio/call-1.mp3",
    transcript: [
      {
        speaker: "Agent",
        timestamp: "00:00",
        text: "Hello, thank you for calling customer support. How can I help you today?"
      },
      {
        speaker: "Customer",
        timestamp: "00:05",
        text: "Hi, I'm having trouble logging into my account."
      },
      {
        speaker: "Agent",
        timestamp: "00:10",
        text: "I'd be happy to help you with that. Can you tell me what happens when you try to log in?"
      }
    ],
    aiScore: 85,
    sentiment: "Neutral",
    intent: "Technical Support",
    actionItems: ["Reset password", "Update contact info"]
  },
  {
    id: "call-2",
    customerName: "Sarah Johnson",
    customerInitials: "SJ",
    phoneNumber: "+1-555-0456",
    callType: "Sales",
    callLength: "12:45",
    timestamp: "2024-01-15T14:15:00Z",
    callPriority: "Medium",
    status: "Pass",
    recordingUrl: "/audio/call-2.mp3",
    transcript: [
      {
        speaker: "Agent",
        timestamp: "00:00",
        text: "Good afternoon! Thank you for your interest in our product. How can I assist you today?"
      },
      {
        speaker: "Customer",
        timestamp: "00:05",
        text: "Hi! I'm interested in learning more about your enterprise solution."
      },
      {
        speaker: "Agent",
        timestamp: "00:10",
        text: "Excellent! I'd be happy to walk you through our enterprise features and pricing."
      }
    ],
    aiScore: 92,
    sentiment: "Positive",
    intent: "Product Inquiry",
    actionItems: ["Send product demo", "Follow up next week"]
  },
  {
    id: "call-3",
    customerName: "Mike Davis",
    customerInitials: "MD",
    phoneNumber: "+1-555-0789",
    callType: "Billing",
    callLength: "8:12",
    timestamp: "2024-01-15T16:30:00Z",
    callPriority: "High",
    status: "Fail",
    recordingUrl: "/audio/call-3.mp3",
    transcript: [
      {
        speaker: "Agent",
        timestamp: "00:00",
        text: "Hello, this is billing support. How can I help you today?"
      },
      {
        speaker: "Customer",
        timestamp: "00:05",
        text: "I have a question about a charge on my bill that I don't recognize."
      },
      {
        speaker: "Agent",
        timestamp: "00:10",
        text: "I understand your concern. Let me pull up your account and take a look at that charge."
      }
    ],
    aiScore: 78,
    sentiment: "Negative",
    intent: "Billing Question",
    actionItems: ["Review charges", "Process refund if applicable"]
  },
  {
    id: "call-4",
    customerName: "Emily Chen",
    customerInitials: "EC",
    phoneNumber: "+1-555-0321",
    callType: "Support",
    callLength: "6:45",
    timestamp: "2024-01-16T09:15:00Z",
    callPriority: "Medium",
    status: "Pass",
    recordingUrl: "/audio/call-4.mp3",
    transcript: [
      {
        speaker: "Agent",
        timestamp: "00:00",
        text: "Hello, this is technical support. How can I assist you today?"
      },
      {
        speaker: "Customer",
        timestamp: "00:05",
        text: "Hi, I'm having trouble with the mobile app crashing."
      },
      {
        speaker: "Agent",
        timestamp: "00:10",
        text: "I understand that's frustrating. Let me help you troubleshoot that issue."
      }
    ],
    aiScore: 88,
    sentiment: "Positive",
    intent: "Technical Support",
    actionItems: ["Update app", "Clear cache"]
  },
  {
    id: "call-5",
    customerName: "Robert Wilson",
    customerInitials: "RW",
    phoneNumber: "+1-555-0654",
    callType: "Sales",
    callLength: "15:30",
    timestamp: "2024-01-16T11:45:00Z",
    callPriority: "High",
    status: "In Progress",
    recordingUrl: "/audio/call-5.mp3",
    transcript: [
      {
        speaker: "Agent",
        timestamp: "00:00",
        text: "Thank you for calling our sales team. How can I help you today?"
      },
      {
        speaker: "Customer",
        timestamp: "00:05",
        text: "I'm interested in upgrading to your premium package."
      },
      {
        speaker: "Agent",
        timestamp: "00:10",
        text: "Excellent! I'd be happy to walk you through our premium features and pricing."
      }
    ],
    aiScore: 95,
    sentiment: "Positive",
    intent: "Upgrade Request",
    actionItems: ["Send premium package details", "Schedule follow-up"]
  },
  {
    id: "call-6",
    customerName: "Lisa Anderson",
    customerInitials: "LA",
    phoneNumber: "+1-555-0987",
    callType: "Billing",
    callLength: "4:20",
    timestamp: "2024-01-16T13:30:00Z",
    callPriority: "Low",
    status: "Pass",
    recordingUrl: "/audio/call-6.mp3",
    transcript: [
      {
        speaker: "Agent",
        timestamp: "00:00",
        text: "Hello, billing department. How can I help you?"
      },
      {
        speaker: "Customer",
        timestamp: "00:05",
        text: "I need to update my payment method on file."
      },
      {
        speaker: "Agent",
        timestamp: "00:10",
        text: "I can definitely help you with that. Let me pull up your account."
      }
    ],
    aiScore: 82,
    sentiment: "Neutral",
    intent: "Payment Update",
    actionItems: ["Update payment method", "Send confirmation"]
  },
  {
    id: "call-7",
    customerName: "David Martinez",
    customerInitials: "DM",
    phoneNumber: "+1-555-0147",
    callType: "Support",
    callLength: "9:15",
    timestamp: "2024-01-16T15:20:00Z",
    callPriority: "High",
    status: "Fail",
    recordingUrl: "/audio/call-7.mp3",
    transcript: [
      {
        speaker: "Agent",
        timestamp: "00:00",
        text: "Technical support, how can I assist you?"
      },
      {
        speaker: "Customer",
        timestamp: "00:05",
        text: "My service has been down for two days and nobody has helped me yet!"
      },
      {
        speaker: "Agent",
        timestamp: "00:10",
        text: "I sincerely apologize for the inconvenience. Let me escalate this immediately."
      }
    ],
    aiScore: 65,
    sentiment: "Negative",
    intent: "Service Outage",
    actionItems: ["Escalate to senior tech", "Provide service credit"]
  },
  {
    id: "call-8",
    customerName: "Jennifer Taylor",
    customerInitials: "JT",
    phoneNumber: "+1-555-0258",
    callType: "Sales",
    callLength: "7:55",
    timestamp: "2024-01-16T16:45:00Z",
    callPriority: "Medium",
    status: "Pass",
    recordingUrl: "/audio/call-8.mp3",
    transcript: [
      {
        speaker: "Agent",
        timestamp: "00:00",
        text: "Sales department, thank you for calling. How can I help you?"
      },
      {
        speaker: "Customer",
        timestamp: "00:05",
        text: "I'd like to learn more about your business solutions."
      },
      {
        speaker: "Agent",
        timestamp: "00:10",
        text: "Perfect! I'd be happy to discuss our business packages with you."
      }
    ],
    aiScore: 91,
    sentiment: "Positive",
    intent: "Business Inquiry",
    actionItems: ["Send business package info", "Schedule demo"]
  }
]
