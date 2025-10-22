// server.js
import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 Variables de entorno
const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_KEY;

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

// 🟢 Editar registro
app.put("/api/editar/:id", async (req, res) => {
  const { id } = req.params;
  const { regalo1, regalo2, regalo3 } = req.body;

  const { error } = await supabase
    .from("regalos")
    .update({ regalo1, regalo2, regalo3 })
    .eq("id", id);

  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: "✅ Actualizado correctamente" });
});

// 🔴 Eliminar registro
app.delete("/api/eliminar/:id", async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from("regalos")
    .delete()
    .eq("id", id);

  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: "🗑️ Eliminado correctamente" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor activo en puerto ${PORT}`));
