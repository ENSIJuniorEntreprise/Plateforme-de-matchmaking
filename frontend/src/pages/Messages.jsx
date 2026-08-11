import { useState, useEffect, useRef, useCallback } from "react";
import { Send, ArrowLeft, MessageSquare, Plus } from "lucide-react";
import { apiGet, apiPost, resolveAssetUrl } from "../api/client";

function ContactAvatar({ name, avatarUrl, size = 44 }) {
  const src = resolveAssetUrl(avatarUrl);
  const initials = (name || "?").trim().slice(0, 2).toUpperCase();
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        style={{ width: size, height: size }}
        className="shrink-0 rounded-full border border-white/10 object-cover"
      />
    );
  }
  return (
    <div
      style={{ width: size, height: size }}
      className="flex shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#2A2D3E] font-bold text-[#FF540B]"
    >
      {initials}
    </div>
  );
}

function formatTime(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  const now = new Date();
  const sameDay = d.toDateString() === now.toDateString();
  return sameDay
    ? d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
    : d.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" });
}

function EmptyMsg({ text, icon }) {
  return (
    <div className="flex flex-col items-center gap-[10px] py-[24px] text-center">
      {icon && <MessageSquare className="h-8 w-8 text-[#3a3d52]" />}
      <p className="font-sora text-[0.82rem] text-[#6b7280]">{text}</p>
    </div>
  );
}

function ConversationRow({ conv, active, onSelect }) {
  const name = conv.company || `${conv.firstName || ""} ${conv.lastName || ""}`.trim() || "Utilisateur";
  return (
    <button
      onClick={() => onSelect(conv.contactId)}
      className={`flex w-full items-center gap-[12px] rounded-[14px] border px-[12px] py-[10px] text-left transition-colors duration-200 ${
        active
          ? "border-[rgba(255,84,11,0.3)] bg-[rgba(255,84,11,0.1)]"
          : "border-transparent hover:bg-white/[0.04]"
      }`}
    >
      <ContactAvatar name={name} avatarUrl={conv.avatarUrl} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-[8px]">
          <span className="font-sora truncate text-[0.88rem] font-bold text-white">{name}</span>
          <span className="font-sora shrink-0 text-[0.68rem] text-[#6b7280]">{formatTime(conv.lastMessageAt)}</span>
        </div>
        <div className="mt-[2px] flex items-center justify-between gap-[8px]">
          <span className="font-sora truncate text-[0.78rem] text-[#8A8FA8]">{conv.lastMessage}</span>
          {conv.unreadCount > 0 && (
            <span className="font-sora flex h-[18px] min-w-[18px] shrink-0 items-center justify-center rounded-full bg-[#FF540B] px-[5px] text-[0.65rem] font-extrabold text-white">
              {conv.unreadCount}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

function MessageBubble({ msg, isOwn }) {
  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[75%] rounded-[16px] px-[14px] py-[9px] text-[0.85rem] leading-relaxed ${
          isOwn
            ? "rounded-br-[4px] bg-[#FF540B] text-white"
            : "rounded-bl-[4px] bg-[rgba(255,255,255,0.06)] text-[#e5e7eb]"
        }`}
      >
        {msg.content}
        <div className={`mt-[4px] text-[0.65rem] ${isOwn ? "text-white/70" : "text-[#6b7280]"}`}>
          {formatTime(msg.createdAt)}
        </div>
      </div>
    </div>
  );
}

export default function Messages({ onNavigate, user, initialContactId }) {
  const [conversations, setConversations] = useState([]);
  const [loadingConvs, setLoadingConvs] = useState(true);
  const [activeContactId, setActiveContactId] = useState(initialContactId || null);
  const [activeContact, setActiveContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [newConvVisible, setNewConvVisible] = useState(false);
  const [connections, setConnections] = useState([]);
  const [loadingConnections, setLoadingConnections] = useState(false);
  const bottomRef = useRef(null);

  const loadConversations = useCallback(async () => {
    setLoadingConvs(true);
    try {
      const data = await apiGet("/messages/conversations");
      setConversations(data.conversations || []);
    } catch (err) {
      setError(err.message || "Impossible de charger les conversations.");
    } finally {
      setLoadingConvs(false);
    }
  }, []);

  useEffect(() => {
    if (user) loadConversations();
  }, [user, loadConversations]);

  useEffect(() => {
    if (initialContactId) setActiveContactId(initialContactId);
  }, [initialContactId]);

  useEffect(() => {
    if (!activeContactId) return undefined;
    let cancelled = false;

    const load = async () => {
      setLoadingMessages(true);
      try {
        const data = await apiGet(`/messages/${activeContactId}`);
        if (cancelled) return;
        setMessages(data.messages || []);
        setConversations((prev) =>
          prev.map((c) => (c.contactId === activeContactId ? { ...c, unreadCount: 0 } : c))
        );
      } catch (err) {
        if (!cancelled) setError(err.message || "Impossible de charger la conversation.");
      } finally {
        if (!cancelled) setLoadingMessages(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [activeContactId]);

  // Résout les infos d'affichage du contact actif (depuis la liste des conversations,
  // ou via l'API si on arrive directement sur une conversation sans historique existant)
  useEffect(() => {
    if (!activeContactId) {
      setActiveContact(null);
      return undefined;
    }
    const fromList = conversations.find((c) => c.contactId === activeContactId);
    if (fromList) {
      setActiveContact(fromList);
      return undefined;
    }
    let cancelled = false;
    apiGet(`/users/${activeContactId}`)
      .then((data) => {
        if (cancelled) return;
        const u = data.user;
        setActiveContact({
          contactId: activeContactId,
          firstName: u.firstName,
          lastName: u.lastName,
          company: u.company,
          avatarUrl: u.avatarUrl,
        });
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [activeContactId, conversations]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const openNewConversation = async () => {
    setNewConvVisible(true);
    setLoadingConnections(true);
    try {
      const data = await apiGet("/matches/connections?status=accepted");
      const contacts = (data.connections || [])
        .map((c) => (String(c.requester?._id) === String(user._id) ? c.recipient : c.requester))
        .filter(Boolean);
      setConnections(contacts);
    } catch (err) {
      setError(err.message || "Impossible de charger vos connexions.");
    } finally {
      setLoadingConnections(false);
    }
  };

  const startConversationWith = (contact) => {
    setNewConvVisible(false);
    setActiveContact({ contactId: contact._id, ...contact });
    setActiveContactId(contact._id);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const content = draft.trim();
    if (!content || !activeContactId || sending) return;
    setSending(true);
    setDraft("");
    try {
      const data = await apiPost(`/messages/${activeContactId}`, { content });
      setMessages((prev) => [...prev, data.message]);
      loadConversations();
    } catch (err) {
      setError(err.message || "Échec de l'envoi du message.");
      setDraft(content);
    } finally {
      setSending(false);
    }
  };

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#14161e] p-5">
        <div className="max-w-sm rounded-2xl border border-white/[0.08] bg-[#1a1d27] p-8 text-center">
          <p className="mb-2 text-lg font-bold text-white">Connectez-vous</p>
          <p className="mb-5 text-sm text-gray-400">Vous devez être connecté pour accéder à votre messagerie.</p>
          <button
            onClick={() => onNavigate && onNavigate("signin")}
            className="rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
          >
            Se connecter
          </button>
        </div>
      </div>
    );
  }

  const contactName = activeContact
    ? activeContact.company || `${activeContact.firstName || ""} ${activeContact.lastName || ""}`.trim()
    : "";

  return (
    <div className="font-sora min-h-screen bg-[#14161e] px-[clamp(12px,4vw,48px)] pb-[40px] pt-[32px] sm:pt-[40px]">
      <div className="mb-[24px] flex flex-wrap items-center justify-between gap-[12px]">
        <div>
          <h1 className="m-0 text-[clamp(1.3rem,3vw,1.8rem)] font-extrabold text-white">Messages</h1>
          <p className="mt-[6px] text-[0.85rem] text-[#6b7280]">Vos conversations avec vos matchs</p>
        </div>
        <button
          onClick={openNewConversation}
          className="font-sora flex cursor-pointer items-center gap-[6px] rounded-[12px] bg-[#FF540B] px-[16px] py-[9px] text-[0.82rem] font-bold text-white transition-all duration-200 hover:bg-[#e04800]"
        >
          <Plus className="h-4 w-4" />
          Nouvelle conversation
        </button>
      </div>

      {newConvVisible && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setNewConvVisible(false)}
        >
          <div
            className="max-h-[70vh] w-full max-w-sm overflow-y-auto rounded-2xl border border-white/10 bg-[#1a1d27] p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="mb-4 text-lg font-bold text-white">Nouvelle conversation</h3>
            {loadingConnections ? (
              <EmptyMsg text="Chargement…" />
            ) : connections.length === 0 ? (
              <EmptyMsg text="Aucune connexion acceptée pour le moment. Envoyez ou acceptez des demandes depuis Matchmaking / Dashboard." />
            ) : (
              <div className="flex flex-col gap-[4px]">
                {connections.map((c) => {
                  const name = c.company || `${c.firstName || ""} ${c.lastName || ""}`.trim() || "Utilisateur";
                  return (
                    <button
                      key={c._id}
                      onClick={() => startConversationWith(c)}
                      className="flex items-center gap-[10px] rounded-[12px] px-[10px] py-[8px] text-left transition-colors duration-200 hover:bg-white/[0.06]"
                    >
                      <ContactAvatar name={name} avatarUrl={c.avatarUrl} size={36} />
                      <span className="font-sora truncate text-[0.85rem] font-semibold text-white">{name}</span>
                    </button>
                  );
                })}
              </div>
            )}
            <button
              onClick={() => setNewConvVisible(false)}
              className="mt-4 w-full rounded-xl border border-white/10 py-2 text-sm font-semibold text-gray-400 transition-colors hover:border-white/30"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {error && (
        <p className="mb-[16px] rounded-[12px] border border-[rgba(232,74,0,0.35)] bg-[rgba(232,74,0,0.12)] px-[16px] py-[10px] text-center text-[0.82rem] font-medium text-[#ff7043]">
          {error}
        </p>
      )}

      <div className="flex h-[calc(100vh-220px)] min-h-[500px] gap-[16px] overflow-hidden rounded-[20px] border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.03)] backdrop-blur-md">

        {/* ── Conversations list ── */}
        <div
          className={`w-full shrink-0 flex-col border-r border-[rgba(255,255,255,0.07)] md:flex md:w-[320px] ${
            activeContactId ? "hidden" : "flex"
          }`}
        >
          <div className="flex-1 overflow-y-auto p-[12px]">
            {loadingConvs ? (
              <EmptyMsg text="Chargement…" />
            ) : conversations.length === 0 ? (
              <EmptyMsg text="Aucune conversation pour le moment." />
            ) : (
              <div className="flex flex-col gap-[4px]">
                {conversations.map((c) => (
                  <ConversationRow
                    key={c.contactId}
                    conv={c}
                    active={c.contactId === activeContactId}
                    onSelect={setActiveContactId}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Active conversation ── */}
        <div className={`min-w-0 flex-1 flex-col md:flex ${activeContactId ? "flex" : "hidden"}`}>
          {!activeContactId ? (
            <div className="flex flex-1 items-center justify-center">
              <EmptyMsg text="Sélectionnez une conversation pour commencer." icon />
            </div>
          ) : (
            <>
              <div className="flex items-center gap-[12px] border-b border-[rgba(255,255,255,0.07)] px-[16px] py-[12px]">
                <button onClick={() => setActiveContactId(null)} className="text-[#6b7280] hover:text-white md:hidden">
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onNavigate && onNavigate("profile", { userId: activeContactId })}
                  className="flex min-w-0 flex-1 items-center gap-[12px] text-left"
                >
                  <ContactAvatar name={contactName} avatarUrl={activeContact?.avatarUrl} size={38} />
                  <span className="font-sora truncate text-[0.95rem] font-bold text-white hover:text-[#FF540B] transition-colors">{contactName || "…"}</span>
                </button>
                <button
                  onClick={() => onNavigate && onNavigate("profile", { userId: activeContactId })}
                  className="font-sora shrink-0 whitespace-nowrap text-[0.78rem] font-semibold text-[#6b7280] transition-colors hover:text-[#FF540B]"
                >
                  Voir le profil
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-[16px] py-[16px]">
                {loadingMessages ? (
                  <EmptyMsg text="Chargement…" />
                ) : messages.length === 0 ? (
                  <EmptyMsg text="Aucun message. Lancez la conversation !" />
                ) : (
                  <div className="flex flex-col gap-[10px]">
                    {messages.map((m) => (
                      <MessageBubble key={m._id} msg={m} isOwn={String(m.sender) === String(user._id)} />
                    ))}
                    <div ref={bottomRef} />
                  </div>
                )}
              </div>

              <form onSubmit={handleSend} className="flex items-center gap-[10px] border-t border-[rgba(255,255,255,0.07)] p-[12px]">
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Écrivez un message…"
                  className="font-sora flex-1 rounded-[12px] border border-[rgba(255,255,255,0.1)] bg-[#0f1117] px-[14px] py-[10px] text-[0.85rem] text-white outline-none transition-colors focus:border-orange-500"
                />
                <button
                  type="submit"
                  disabled={!draft.trim() || sending}
                  className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[12px] bg-[#FF540B] text-white transition-all duration-200 hover:bg-[#e04800] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
