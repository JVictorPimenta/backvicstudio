const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim());

// Aceita qualquer domínio de produção ou preview do projeto "luz-e-sombra" na Vercel.
const vercelPreviewRegex = /^https:\/\/luz-e-sombra(-[a-z0-9]+)*\.vercel\.app$/;

const corsOptions = {
  origin(origin, callback) {
    const isAllowed =
      !origin ||
      allowedOrigins.includes(origin) ||
      vercelPreviewRegex.test(origin);

    if (isAllowed) {
      return callback(null, true);
    }

    return callback(new Error("Origem nao permitida pelo CORS"));
  },
};

export default corsOptions;
