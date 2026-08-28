import React, { useEffect, useState, useCallback } from "react";
import {
  ShieldAlert,
  ShieldCheck,
  Users,
  UserCheck,
  UserX,
  Ban,
  Trash2,
  Search,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Network,
  MessageSquare,
  BadgeCheck,
  Crown,
} from "lucide-react";
import { resolveAssetUrl } from "../api/client";
import {
  getOverview,
  listUsersAdmin,
  updateUserAdmin,
  deleteUserAdmin,
  listConnectionsAdmin,
  deleteConnectionAdmin,
  listMessagesAdmin,
  deleteMessageAdmin,
} from "../api/admin";

// ─── Static config ─────────────────────────────────────────────────────────

const ROLE_META = {
  startup: { icon: "🏢", label: "Startup" },
  talent: { icon: "👤", label: "Talent" },
  investisseur: { icon: "💲", label: "Investisseur" },
  incubateur: { icon: "🚀", label: "Incubateur" },
};

const TABS = [
  { id: "overview", label: "Vue d'ensemble", icon: LayoutGrid },
  { id: "users", label: "Utilisateurs", icon: Users },
  { id: "connections", label: "Connexions", icon: Network },
  { id: "messages", label: "Messages", icon: MessageSquare },
];

const CONNECTION_STATUS_LABELS = {
  pending: "En attente",
  accepted: "Acceptée",
  declined: "Refusée",
};

// ─── Small shared pieces ────────────────────────────────────────────────────

function Avatar({ avatarUrl, name }) {
  const src = resolveAssetUrl(avatarUrl);
  if (src) {
    return <img src={src} alt={name} className="h-[38px] w-[38px] shrink-0 rounded-[10px] border border-[rgba(255,255,255,0.1)] object-cover" />;
  }
  return (
    <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[10px] border border-[rgba(255,255,255,0.1)] bg-[#2A2D3E] text-[0.85rem] font-bold text-[#FF540B]">
      {name?.charAt(0)?.toUpperCase() || "?"}
    </div>
  );
}

function Badge({ tone, children }) {
  const tones = {
    green: "text-[#10b981] bg-[rgba(16,185,129,0.12)]",
    red: "text-[#ff6b6b] bg-[rgba(255,107,107,0.12)]",
    orange: "text-[#FF540B] bg-[rgba(255,84,11,0.12)]",
    gray: "text-[#8A8FA8] bg-[rgba(138,143,168,0.12)]",
    blue: "text-[#3b82f6] bg-[rgba(59,130,246,0.12)]",
  };
  return (
    <span className={`font-sora inline-flex items-center gap-[4px] rounded-full px-[9px] py-[3px] text-[0.68rem] font-bold ${tones[tone]}`}>
      {children}
    </span>
  );
}

function IconButton({ onClick, disabled, title, tone = "gray", children }) {
  const tones = {
    gray: "border-[rgba(255,255,255,0.12)] text-[#9ca3af] hover:border-[rgba(255,255,255,0.25)] hover:text-white",
    green: "border-[rgba(16,185,129,0.3)] text-[#10b981] hover:bg-[rgba(16,185,129,0.1)]",
    red: "border-[rgba(255,107,107,0.3)] text-[#ff6b6b] hover:bg-[rgba(255,107,107,0.1)]",
    orange: "border-[rgba(255,84,11,0.3)] text-[#FF540B] hover:bg-[rgba(255,84,11,0.1)]",
  };
  return (
    <button
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={`flex h-[32px] w-[32px] shrink-0 cursor-pointer items-center justify-center rounded-[9px] border bg-transparent transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-40 ${tones[tone]}`}
    >
      {children}
    </button>
  );
}

function Pagination({ page, pages, onChange }) {
  if (pages <= 1) return null;
  return (
    <div className="mt-[16px] flex items-center justify-center gap-[10px]">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        className="flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-[9px] border border-[rgba(255,255,255,0.12)] bg-transparent text-[#9ca3af] transition-colors duration-150 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <span className="font-sora text-[0.78rem] font-semibold text-[#9ca3af]">
        Page {page} / {pages}
      </span>
      <button
        onClick={() => onChange(page + 1)}
        disabled={page >= pages}
        className="flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-[9px] border border-[rgba(255,255,255,0.12)] bg-transparent text-[#9ca3af] transition-colors duration-150 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

function Card({ children, className = "" }) {
  return (
    <div className={`rounded-[20px] border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.03)] p-[20px] backdrop-blur-md sm:p-[28px] ${className}`}>
      {children}
    </div>
  );
}

function EmptyState({ text }) {
  return <p className="font-sora py-[30px] text-center text-[0.82rem] text-[#6b7280]">{text}</p>;
}

// ─── Overview tab ───────────────────────────────────────────────────────────

const STAT_CARDS = [
  { key: "totalUsers", label: "Utilisateurs", icon: Users, iconClass: "text-[#3b82f6]", iconBgClass: "bg-[rgba(59,130,246,0.12)]" },
  { key: "verifiedUsers", label: "Vérifiés", icon: BadgeCheck, iconClass: "text-[#10b981]", iconBgClass: "bg-[rgba(16,185,129,0.12)]" },
  { key: "adminUsers", label: "Administrateurs", icon: Crown, iconClass: "text-[#FF540B]", iconBgClass: "bg-[rgba(255,84,11,0.12)]" },
  { key: "bannedUsers", label: "Suspendus", icon: Ban, iconClass: "text-[#ff6b6b]", iconBgClass: "bg-[rgba(255,107,107,0.12)]" },
  { key: "newUsers7d", label: "Nouveaux (7j)", icon: Users, iconClass: "text-[#a78bfa]", iconBgClass: "bg-[rgba(167,139,250,0.12)]" },
  { key: "acceptedConnections", label: "Matchs acceptés", icon: Network, iconClass: "text-[#3b82f6]", iconBgClass: "bg-[rgba(59,130,246,0.12)]" },
  { key: "pendingConnections", label: "Demandes en attente", icon: Network, iconClass: "text-[#f59e0b]", iconBgClass: "bg-[rgba(245,158,11,0.12)]" },
  { key: "totalMessages", label: "Messages échangés", icon: MessageSquare, iconClass: "text-[#10b981]", iconBgClass: "bg-[rgba(16,185,129,0.12)]" },
];

function OverviewTab({ stats, loading, onRetry }) {
  if (loading) return <EmptyState text="Chargement des statistiques…" />;
  if (!stats) {
    return (
      <div className="flex flex-col items-center gap-[12px] py-[30px]">
        <p className="font-sora m-0 text-center text-[0.82rem] text-[#6b7280]">Impossible de charger les statistiques.</p>
        <button
          onClick={onRetry}
          className="font-sora cursor-pointer rounded-[10px] border border-[rgba(255,255,255,0.12)] bg-transparent px-[14px] py-[8px] text-[0.78rem] font-bold text-[#9ca3af] transition-colors duration-150 hover:border-[rgba(255,84,11,0.4)] hover:text-[#FF540B]"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[24px]">
      <div className="grid grid-cols-2 gap-[14px] sm:grid-cols-3 lg:grid-cols-4">
        {STAT_CARDS.map((def) => {
          const Icon = def.icon;
          return (
            <div key={def.key} className="flex flex-col gap-[10px] rounded-[16px] border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.04)] px-[16px] py-[16px]">
              <div className={`flex h-[32px] w-[32px] items-center justify-center rounded-[9px] ${def.iconBgClass}`}>
                <Icon strokeWidth={2.2} className={`h-[16px] w-[16px] ${def.iconClass}`} />
              </div>
              <div>
                <div className="font-sora text-[1.4rem] font-extrabold leading-none text-white">
                  {(stats[def.key] ?? 0).toLocaleString("fr-FR")}
                </div>
                <div className="font-sora mt-[4px] text-[0.72rem] text-[#6b7280]">{def.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      <Card>
        <h3 className="m-0 mb-[16px] text-[0.95rem] font-extrabold text-white">Répartition par rôle</h3>
        <div className="flex flex-col gap-[10px]">
          {Object.entries(stats.roleCounts || {}).map(([role, count]) => {
            const meta = ROLE_META[role] || { icon: "👤", label: role };
            const total = stats.totalUsers || 1;
            const pct = Math.round((count / total) * 100);
            return (
              <div key={role} className="flex items-center gap-[12px]">
                <span className="w-[150px] shrink-0 text-[0.82rem] font-semibold text-white">
                  {meta.icon} {meta.label}
                </span>
                <div className="h-[8px] flex-1 overflow-hidden rounded-full bg-[rgba(255,255,255,0.06)]">
                  <div className="h-full rounded-full bg-[#FF540B]" style={{ width: `${pct}%` }} />
                </div>
                <span className="w-[48px] shrink-0 text-right text-[0.78rem] font-bold text-[#9ca3af]">{count}</span>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

// ─── Users tab ──────────────────────────────────────────────────────────────

function UserRow({ u, busy, onToggleVerified, onToggleBanned, onToggleAdmin, onDelete, isSelf }) {
  const meta = ROLE_META[u.role] || { icon: "👤", label: u.role };
  const name = `${u.firstName} ${u.lastName}`.trim();
  return (
    <div className="flex flex-wrap items-center gap-[12px] rounded-[14px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-[14px] py-[12px]">
      <Avatar avatarUrl={u.avatarUrl} name={name} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-[8px]">
          <span className="font-sora truncate text-[0.9rem] font-bold text-white">{name || "Utilisateur"}</span>
          {isSelf && <Badge tone="gray">Vous</Badge>}
          {u.isAdmin && <Badge tone="orange">Admin</Badge>}
          {u.isVerified && <Badge tone="green">Vérifié</Badge>}
          {u.isBanned && <Badge tone="red">Suspendu</Badge>}
        </div>
        <div className="font-sora mt-[3px] truncate text-[0.76rem] text-[#6b7280]">
          {meta.icon} {meta.label} · {u.email} {u.company ? `· ${u.company}` : ""}
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-[6px]">
        <IconButton
          title={u.isVerified ? "Retirer la vérification" : "Vérifier"}
          tone={u.isVerified ? "green" : "gray"}
          disabled={busy}
          onClick={() => onToggleVerified(u)}
        >
          <UserCheck className="h-[15px] w-[15px]" />
        </IconButton>
        <IconButton
          title={u.isAdmin ? "Retirer les droits admin" : "Promouvoir admin"}
          tone={u.isAdmin ? "orange" : "gray"}
          disabled={busy || isSelf}
          onClick={() => onToggleAdmin(u)}
        >
          <Crown className="h-[15px] w-[15px]" />
        </IconButton>
        <IconButton
          title={u.isBanned ? "Réactiver le compte" : "Suspendre le compte"}
          tone={u.isBanned ? "red" : "gray"}
          disabled={busy || isSelf}
          onClick={() => onToggleBanned(u)}
        >
          {u.isBanned ? <UserX className="h-[15px] w-[15px]" /> : <Ban className="h-[15px] w-[15px]" />}
        </IconButton>
        <IconButton title="Supprimer" tone="red" disabled={busy || isSelf} onClick={() => onDelete(u)}>
          <Trash2 className="h-[15px] w-[15px]" />
        </IconButton>
      </div>
    </div>
  );
}

function UsersTab({ currentUserId }) {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [verified, setVerified] = useState("");
  const [banned, setBanned] = useState("");

  // Débounce de la recherche texte pour éviter une requête par frappe.
  useEffect(() => {
    const t = setTimeout(() => setSearch(searchInput.trim()), 400);
    return () => clearTimeout(t);
  }, [searchInput]);

  useEffect(() => setPage(1), [search, role, verified, banned]);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await listUsersAdmin({ search, role, verified, banned, page, limit: 20 });
      setUsers(res.users || []);
      setTotal(res.total || 0);
      setPages(res.pages || 1);
    } catch (err) {
      setError(err.message || "Impossible de charger les utilisateurs.");
    } finally {
      setLoading(false);
    }
  }, [search, role, verified, banned, page]);

  useEffect(() => { load(); }, [load]);

  const patchLocal = (id, updates) => {
    setUsers((prev) => prev.map((u) => (u._id === id ? { ...u, ...updates } : u)));
  };

  const runUpdate = async (u, updates) => {
    setBusyId(u._id);
    try {
      await updateUserAdmin(u._id, updates);
      patchLocal(u._id, updates);
    } catch (err) {
      setError(err.message || "Action impossible.");
    } finally {
      setBusyId(null);
    }
  };

  const onToggleVerified = (u) => runUpdate(u, { isVerified: !u.isVerified });
  const onToggleAdmin = (u) => runUpdate(u, { isAdmin: !u.isAdmin });
  const onToggleBanned = (u) => {
    if (!u.isBanned && !window.confirm(`Suspendre le compte de ${u.firstName} ${u.lastName} ?`)) return;
    runUpdate(u, { isBanned: !u.isBanned });
  };
  const onDelete = async (u) => {
    if (!window.confirm(`Supprimer définitivement le compte de ${u.firstName} ${u.lastName} ? Cette action est irréversible.`)) return;
    setBusyId(u._id);
    try {
      await deleteUserAdmin(u._id);
      setUsers((prev) => prev.filter((x) => x._id !== u._id));
      setTotal((t) => Math.max(0, t - 1));
    } catch (err) {
      setError(err.message || "Suppression impossible.");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="flex flex-col gap-[16px]">
      <div className="flex flex-wrap items-center gap-[10px]">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="pointer-events-none absolute left-[12px] top-1/2 h-4 w-4 -translate-y-1/2 text-[#6b7280]" />
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Rechercher (nom, email, entreprise)…"
            className="font-sora w-full rounded-[10px] border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] py-[9px] pl-[36px] pr-[12px] text-[0.82rem] text-white outline-none placeholder:text-[#6b7280] focus:border-[rgba(255,84,11,0.4)]"
          />
        </div>
        <select value={role} onChange={(e) => setRole(e.target.value)} className="font-sora cursor-pointer rounded-[10px] border border-[rgba(255,255,255,0.1)] bg-[#20222C] px-[10px] py-[9px] text-[0.8rem] text-white outline-none">
          <option value="">Tous les rôles</option>
          {Object.entries(ROLE_META).map(([key, meta]) => (
            <option key={key} value={key}>{meta.label}</option>
          ))}
        </select>
        <select value={verified} onChange={(e) => setVerified(e.target.value)} className="font-sora cursor-pointer rounded-[10px] border border-[rgba(255,255,255,0.1)] bg-[#20222C] px-[10px] py-[9px] text-[0.8rem] text-white outline-none">
          <option value="">Vérifié : tous</option>
          <option value="true">Vérifiés</option>
          <option value="false">Non vérifiés</option>
        </select>
        <select value={banned} onChange={(e) => setBanned(e.target.value)} className="font-sora cursor-pointer rounded-[10px] border border-[rgba(255,255,255,0.1)] bg-[#20222C] px-[10px] py-[9px] text-[0.8rem] text-white outline-none">
          <option value="">Statut : tous</option>
          <option value="false">Actifs</option>
          <option value="true">Suspendus</option>
        </select>
      </div>

      <div className="font-sora text-[0.76rem] text-[#6b7280]">{total} utilisateur{total > 1 ? "s" : ""}</div>

      {error && (
        <p className="rounded-[12px] border border-[rgba(232,74,0,0.35)] bg-[rgba(232,74,0,0.12)] px-[16px] py-[10px] text-center text-[0.8rem] font-medium text-[#ff7043]">
          {error}
        </p>
      )}

      <div className="flex flex-col gap-[8px]">
        {loading ? (
          <EmptyState text="Chargement…" />
        ) : users.length === 0 ? (
          <EmptyState text="Aucun utilisateur ne correspond à ces filtres." />
        ) : (
          users.map((u) => (
            <UserRow
              key={u._id}
              u={u}
              busy={busyId === u._id}
              isSelf={String(u._id) === String(currentUserId)}
              onToggleVerified={onToggleVerified}
              onToggleBanned={onToggleBanned}
              onToggleAdmin={onToggleAdmin}
              onDelete={onDelete}
            />
          ))
        )}
      </div>

      <Pagination page={page} pages={pages} onChange={setPage} />
    </div>
  );
}

// ─── Connections tab ────────────────────────────────────────────────────────

function ConnectionRow({ c, busy, onDelete }) {
  const reqName = c.requester ? `${c.requester.firstName} ${c.requester.lastName}`.trim() : "?";
  const recName = c.recipient ? `${c.recipient.firstName} ${c.recipient.lastName}`.trim() : "?";
  const statusTone = c.status === "accepted" ? "green" : c.status === "declined" ? "red" : "orange";

  return (
    <div className="flex flex-wrap items-center gap-[12px] rounded-[14px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-[14px] py-[12px]">
      <Avatar avatarUrl={c.requester?.avatarUrl} name={reqName} />
      <div className="min-w-0 flex-1">
        <div className="font-sora truncate text-[0.86rem] font-bold text-white">
          {reqName} <span className="text-[#6b7280]">→</span> {recName}
        </div>
        <div className="font-sora mt-[3px] flex flex-wrap items-center gap-[8px] text-[0.75rem] text-[#6b7280]">
          <Badge tone={statusTone}>{CONNECTION_STATUS_LABELS[c.status] || c.status}</Badge>
          <span>{c.compatibilityScore}% compatibilité</span>
          <span>· {new Date(c.createdAt).toLocaleDateString("fr-FR")}</span>
        </div>
      </div>
      <IconButton title="Supprimer la connexion" tone="red" disabled={busy} onClick={() => onDelete(c)}>
        <Trash2 className="h-[15px] w-[15px]" />
      </IconButton>
    </div>
  );
}

function ConnectionsTab() {
  const [connections, setConnections] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);

  useEffect(() => setPage(1), [status]);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await listConnectionsAdmin({ status, page, limit: 20 });
      setConnections(res.connections || []);
      setTotal(res.total || 0);
      setPages(res.pages || 1);
    } catch (err) {
      setError(err.message || "Impossible de charger les connexions.");
    } finally {
      setLoading(false);
    }
  }, [status, page]);

  useEffect(() => { load(); }, [load]);

  const onDelete = async (c) => {
    if (!window.confirm("Supprimer cette connexion ?")) return;
    setBusyId(c._id);
    try {
      await deleteConnectionAdmin(c._id);
      setConnections((prev) => prev.filter((x) => x._id !== c._id));
      setTotal((t) => Math.max(0, t - 1));
    } catch (err) {
      setError(err.message || "Suppression impossible.");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="flex flex-col gap-[16px]">
      <div className="flex flex-wrap items-center gap-[10px]">
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="font-sora cursor-pointer rounded-[10px] border border-[rgba(255,255,255,0.1)] bg-[#20222C] px-[10px] py-[9px] text-[0.8rem] text-white outline-none">
          <option value="">Statut : tous</option>
          <option value="pending">En attente</option>
          <option value="accepted">Acceptées</option>
          <option value="declined">Refusées</option>
        </select>
        <span className="font-sora text-[0.76rem] text-[#6b7280]">{total} connexion{total > 1 ? "s" : ""}</span>
      </div>

      {error && (
        <p className="rounded-[12px] border border-[rgba(232,74,0,0.35)] bg-[rgba(232,74,0,0.12)] px-[16px] py-[10px] text-center text-[0.8rem] font-medium text-[#ff7043]">
          {error}
        </p>
      )}

      <div className="flex flex-col gap-[8px]">
        {loading ? (
          <EmptyState text="Chargement…" />
        ) : connections.length === 0 ? (
          <EmptyState text="Aucune connexion trouvée." />
        ) : (
          connections.map((c) => <ConnectionRow key={c._id} c={c} busy={busyId === c._id} onDelete={onDelete} />)
        )}
      </div>

      <Pagination page={page} pages={pages} onChange={setPage} />
    </div>
  );
}

// ─── Messages tab ───────────────────────────────────────────────────────────

function MessageRow({ m, busy, onDelete }) {
  const senderName = m.sender ? `${m.sender.firstName} ${m.sender.lastName}`.trim() : "?";
  const recipientName = m.recipient ? `${m.recipient.firstName} ${m.recipient.lastName}`.trim() : "?";
  return (
    <div className="flex flex-wrap items-start gap-[12px] rounded-[14px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-[14px] py-[12px]">
      <Avatar avatarUrl={m.sender?.avatarUrl} name={senderName} />
      <div className="min-w-0 flex-1">
        <div className="font-sora truncate text-[0.82rem] font-bold text-white">
          {senderName} <span className="text-[#6b7280]">→</span> {recipientName}
        </div>
        <p className="font-sora m-0 mt-[4px] line-clamp-2 text-[0.78rem] text-[#9ca3af]">{m.content}</p>
        <div className="font-sora mt-[4px] text-[0.7rem] text-[#6b7280]">
          {new Date(m.createdAt).toLocaleString("fr-FR")}
        </div>
      </div>
      <IconButton title="Supprimer le message" tone="red" disabled={busy} onClick={() => onDelete(m)}>
        <Trash2 className="h-[15px] w-[15px]" />
      </IconButton>
    </div>
  );
}

function MessagesTab() {
  const [messages, setMessages] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setSearch(searchInput.trim()), 400);
    return () => clearTimeout(t);
  }, [searchInput]);

  useEffect(() => setPage(1), [search]);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await listMessagesAdmin({ search, page, limit: 30 });
      setMessages(res.messages || []);
      setTotal(res.total || 0);
      setPages(res.pages || 1);
    } catch (err) {
      setError(err.message || "Impossible de charger les messages.");
    } finally {
      setLoading(false);
    }
  }, [search, page]);

  useEffect(() => { load(); }, [load]);

  const onDelete = async (m) => {
    if (!window.confirm("Supprimer ce message ?")) return;
    setBusyId(m._id);
    try {
      await deleteMessageAdmin(m._id);
      setMessages((prev) => prev.filter((x) => x._id !== m._id));
      setTotal((t) => Math.max(0, t - 1));
    } catch (err) {
      setError(err.message || "Suppression impossible.");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="flex flex-col gap-[16px]">
      <div className="flex flex-wrap items-center gap-[10px]">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="pointer-events-none absolute left-[12px] top-1/2 h-4 w-4 -translate-y-1/2 text-[#6b7280]" />
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Rechercher dans le contenu des messages…"
            className="font-sora w-full rounded-[10px] border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] py-[9px] pl-[36px] pr-[12px] text-[0.82rem] text-white outline-none placeholder:text-[#6b7280] focus:border-[rgba(255,84,11,0.4)]"
          />
        </div>
        <span className="font-sora text-[0.76rem] text-[#6b7280]">{total} message{total > 1 ? "s" : ""}</span>
      </div>

      {error && (
        <p className="rounded-[12px] border border-[rgba(232,74,0,0.35)] bg-[rgba(232,74,0,0.12)] px-[16px] py-[10px] text-center text-[0.8rem] font-medium text-[#ff7043]">
          {error}
        </p>
      )}

      <div className="flex flex-col gap-[8px]">
        {loading ? (
          <EmptyState text="Chargement…" />
        ) : messages.length === 0 ? (
          <EmptyState text="Aucun message trouvé." />
        ) : (
          messages.map((m) => <MessageRow key={m._id} m={m} busy={busyId === m._id} onDelete={onDelete} />)
        )}
      </div>

      <Pagination page={page} pages={pages} onChange={setPage} />
    </div>
  );
}

// ─── Main ───────────────────────────────────────────────────────────────────

export default function Admin({ onNavigate, user }) {
  const [tab, setTab] = useState("overview");
  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsReloadKey, setStatsReloadKey] = useState(0);

  useEffect(() => {
    if (!user?.isAdmin) return;
    let cancelled = false;
    setStatsLoading(true);
    getOverview()
      .then((res) => { if (!cancelled) setStats(res.stats); })
      .catch(() => { if (!cancelled) setStats(null); })
      .finally(() => { if (!cancelled) setStatsLoading(false); });
    return () => { cancelled = true; };
  }, [user?.isAdmin, statsReloadKey]);

  if (!user?.isAdmin) {
    return (
      <div className="font-sora flex min-h-screen flex-col items-center justify-center gap-[16px] bg-[#14161e] px-[20px] text-center">
        <ShieldAlert strokeWidth={2} className="h-10 w-10 text-[#ff6b6b]" />
        <h1 className="m-0 text-[1.2rem] font-extrabold text-white">Accès réservé aux administrateurs</h1>
        <p className="m-0 max-w-[380px] text-[0.85rem] text-[#6b7280]">
          Vous n'avez pas les droits nécessaires pour accéder au CMS d'administration.
        </p>
        <button
          onClick={() => onNavigate && onNavigate("dashboard")}
          className="font-sora mt-[6px] cursor-pointer rounded-[50px] border-none bg-[#FF540B] px-[20px] py-[10px] text-[0.85rem] font-bold text-white transition-colors duration-200 hover:bg-[#e04800]"
        >
          Retour au tableau de bord
        </button>
      </div>
    );
  }

  return (
    <div className="font-sora min-h-screen bg-[#14161e] px-[clamp(12px,4vw,48px)] pb-[60px] pt-[32px] sm:pt-[40px]">
      <div className="mb-[28px] flex items-center gap-[12px]">
        <div className="flex h-[40px] w-[40px] items-center justify-center rounded-[12px] bg-[rgba(255,84,11,0.12)]">
          <ShieldCheck strokeWidth={2.2} className="h-5 w-5 text-[#FF540B]" />
        </div>
        <div>
          <h1 className="m-0 text-[1.3rem] font-extrabold text-white sm:text-[1.5rem]">Administration</h1>
          <p className="m-0 text-[0.78rem] text-[#6b7280]">Gestion de la plateforme MatchHub</p>
        </div>
      </div>

      <div className="mb-[24px] flex flex-wrap gap-[8px] border-b border-[rgba(255,255,255,0.07)] pb-[12px]">
        {TABS.map((t) => {
          const Icon = t.icon;
          const isActive = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`font-sora flex cursor-pointer items-center gap-[7px] rounded-[10px] px-[14px] py-[9px] text-[0.82rem] font-bold transition-colors duration-150 ${
                isActive ? "bg-[rgba(255,84,11,0.12)] text-[#FF540B]" : "text-[#9ca3af] hover:bg-[rgba(255,255,255,0.05)] hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4" />
              {t.label}
            </button>
          );
        })}
      </div>

      {tab === "overview" && (
        <OverviewTab stats={stats} loading={statsLoading} onRetry={() => setStatsReloadKey((k) => k + 1)} />
      )}
      {tab === "users" && <UsersTab currentUserId={user?._id} />}
      {tab === "connections" && <ConnectionsTab />}
      {tab === "messages" && <MessagesTab />}
    </div>
  );
}
