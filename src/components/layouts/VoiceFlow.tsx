import { useEffect } from "react";

const VoiceflowChat: React.FC = () => {
  useEffect(() => {
    const loadVoiceflowChat = () => {
      const existingScript = document.querySelector(
        'script[src="https://cdn.voiceflow.com/widget/bundle.mjs"]'
      );

      // Remove the existing script if it's already loaded to ensure fresh load
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement("script");
      script.src = "https://cdn.voiceflow.com/widget/bundle.mjs";
      script.type = "text/javascript";
      script.onload = () => {
        (window as any).voiceflow?.chat.load({
          verify: { projectID: "66f6ac313c065d2f77090b66" },
          url: "https://general-runtime.voiceflow.com",
          versionID: "production",
        });
      };
      document.body.appendChild(script);
    };

    // Load the chatbot script when the component mounts
    loadVoiceflowChat();

    // Reload the chat if the tab is refreshed
    window.addEventListener("beforeunload", () => {
      loadVoiceflowChat();
    });

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("beforeunload", () => {
        loadVoiceflowChat();
      });
    };
  }, []);

  return null; // No UI elements to render
};

export default VoiceflowChat;