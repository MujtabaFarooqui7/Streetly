// Chat functionality for StreetSmart
class ChatManager {
  constructor(apiManager) {
    this.apiManager = apiManager;
    this.messages = [];
    this.chatContainer = document.getElementById("chatMessages");
    this.messageInput = document.getElementById("messageInput");
    this.sendButton = document.getElementById("sendButton");
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.sendButton.addEventListener("click", () => {
      const message = this.messageInput.value.trim();
      if (message) this.sendMessage(message);
    });

    this.messageInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        const message = this.messageInput.value.trim();
        if (message) this.sendMessage(message);
      }
    });
  }

  async sendMessage(messageText) {
    this.messageInput.value = "";
    this.addMessage(messageText, "user");
    this.showTypingIndicator();

    try {
      const response = await this.getAIResponse(messageText);
      this.hideTypingIndicator();
      this.addMessage(response, "ai");
    } catch (error) {
      this.hideTypingIndicator();
      console.error("Error getting AI response:", error);
      this.addMessage("⚠️ Failed to get response. Please try again.", "system");
    }
  }

  addMessage(text, sender) {
    const msg = document.createElement("div");
    if (sender === "user") {
      msg.className =
        "bg-primary text-white p-3 rounded-lg max-w-xs ml-auto shadow";
    } else if (sender === "ai") {
      msg.className =
        "bg-gray-100 text-gray-900 p-3 rounded-lg max-w-xs shadow";
    } else {
      msg.className =
        "bg-red-100 text-red-700 p-3 rounded-lg max-w-xs mx-auto text-center shadow";
    }
    msg.textContent = text;
    this.chatContainer.appendChild(msg);
    this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
  }

  showTypingIndicator() {
    this.typingIndicator = document.createElement("div");
    this.typingIndicator.className =
      "bg-gray-200 text-gray-600 italic p-2 rounded-lg max-w-xs shadow";
    this.typingIndicator.textContent = "Typing...";
    this.chatContainer.appendChild(this.typingIndicator);
    this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
  }

  hideTypingIndicator() {
    if (this.typingIndicator) {
      this.typingIndicator.remove();
      this.typingIndicator = null;
    }
  }

  async getAIResponse(userMessage) {
    return this.apiManager.getChatResponse(userMessage);
  }

  clearMessages() {
    this.chatContainer.innerHTML = "";
    this.messages = [];
  }
}
