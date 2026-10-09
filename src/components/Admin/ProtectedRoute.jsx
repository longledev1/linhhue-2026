import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../../config/supabaseClient";

export default function ProtectedRoute({ children }) {
  const [checking, setChecking] = useState(true);
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setHasSession(!!session);
      setChecking(false);
    });
  }, []);

  if (checking) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-stone-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#ab8c5d] border-t-transparent" />
      </div>
    );
  }

  if (!hasSession) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
