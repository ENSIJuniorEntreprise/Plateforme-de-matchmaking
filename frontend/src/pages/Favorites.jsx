import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { apiGet, apiDelete, resolveAssetUrl } from "../api/client";

const ROLE_LABELS = {
  startup: "Startup",
  talent: "Talent",
  investisseur: "Investisseur",
  incubateur: "Incubateur",
};

function FavoriteAvatar({ name, avatarUrl }) {
  const src = resolveAssetUrl(avatarUrl);
  if (src) {
    return <img src={src} alt={name} className="h-[52px] w-[52px] shrink-0 rounded-[14px] border border-white/10 object-cover" />;
  }
  return (
    <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[14px] border border-white/10 bg-[#2A2D3E] text-[1rem] font-bold text-[#FF540B]">
      {(name || "?").slice(0, 2).toUpperCase()}
    </div>
  );
}

function FavoriteCard({ favorite, onOpen, onRemove, busy }) {
  const name = favorite.company || `${favorite.firstName || ""} ${favorite.lastName || ""}`.trim() || "Utilisateur";
  return (
    <div className="flex items-center gap-[14px] rounded-[16px] border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.03)] p-[16px] transition-all duration-200 hover:border-[rgba(255,84,11,0.3)]">
      <button onClick={() => onOpen(favorite._id)} className="shrink-0">
        <FavoriteAvatar name={name} avatarUrl={favorite.avatarUrl} />
      </button>
      <button onClick={() => onOpen(favorite._id)} className="min-w-0 flex-1 text-left">
        <p className="font-sora truncate text-[0.95rem] font-bold text-white">{name}</p>
        <p className="font-sora mt-[2px] truncate text-[0.78rem] text-[#6b7280]">
          {ROLE_LABELS[favorite.role] || favorite.role}
          {favorite.location ? ` · ${favorite.location}` : ""}
        </p>
      </button>
      <button
        onClick={() => onRemove(favorite._id)}
        disabled={busy}
        className="flex shrink-0 items-center gap-1 rounded-[10px] border border-orange-500/50 px-[10px] py-[7px] text-[0.75rem] font-semibold text-orange-400 transition-colors duration-200 hover:border-orange-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Star className="h-[13px] w-[13px]" fill="currentColor" />
        {busy ? "…" : "Retirer"}
      </button>
    </div>
  );
}

export default function Favorites({ onNavigate, user }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [removingId, setRemovingId] = useState(null);

  useEffect(() => {
    if (!user) return undefined;
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await apiGet("/users/me/favorites");
        if (!cancelled) setFavorites(data.favorites || []);
      } catch (err) {
        if (!cancelled) setError(err.message || "Impossible de charger vos favoris.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [user]);

  const removeFavorite = async (id) => {
    setRemovingId(id);
    try {
      await apiDelete(`/users/me/favorites/${id}`);
      setFavorites((prev) => prev.filter((f) => f._id !== id));
      try {
        const stored = JSON.parse(localStorage.getItem("user") || "null");
        if (stored) {
          stored.favorites = (stored.favorites || []).filter((fid) => String(fid?._id || fid) !== String(id));
          localStorage.setItem("user", JSON.stringify(stored));
        }
      } catch {
        // pas bloquant
      }
    } catch {
      // échec réseau : l'élément reste affiché, l'utilisateur peut réessayer
    } finally {
      setRemovingId(null);
    }
  };

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#14161e] p-5">
        <div className="max-w-sm rounded-2xl border border-white/[0.08] bg-[#1a1d27] p-8 text-center">
          <p className="mb-2 text-lg font-bold text-white">Connectez-vous</p>
          <p className="mb-5 text-sm text-gray-400">Vous devez être connecté pour consulter vos favoris.</p>
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

  return (
    <div className="font-sora min-h-screen bg-[#14161e] px-[clamp(12px,4vw,48px)] pb-[40px] pt-[32px] sm:pt-[40px]">
      <div className="mb-[24px]">
        <h1 className="m-0 text-[clamp(1.3rem,3vw,1.8rem)] font-extrabold text-white">Mes favoris</h1>
        <p className="mt-[6px] text-[0.85rem] text-[#6b7280]">Les profils que vous avez mis de côté</p>
      </div>

      {error && (
        <p className="mb-[16px] rounded-[12px] border border-[rgba(232,74,0,0.35)] bg-[rgba(232,74,0,0.12)] px-[16px] py-[10px] text-center text-[0.82rem] font-medium text-[#ff7043]">
          {error}
        </p>
      )}

      {loading ? (
        <p className="font-sora py-[24px] text-center text-[0.82rem] text-[#6b7280]">Chargement…</p>
      ) : favorites.length === 0 ? (
        <div className="rounded-[20px] border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.03)] p-[40px] text-center">
          <p className="font-sora text-[0.85rem] text-[#6b7280]">
            Aucun favori pour le moment. Cliquez sur "Ajouter aux favoris" depuis le profil d'un utilisateur pour le retrouver ici.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-[12px] sm:grid-cols-2 xl:grid-cols-3">
          {favorites.map((f) => (
            <FavoriteCard
              key={f._id}
              favorite={f}
              busy={removingId === f._id}
              onOpen={(id) => onNavigate && onNavigate("profile", { userId: id })}
              onRemove={removeFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}
