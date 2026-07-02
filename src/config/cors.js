const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim());

// Aceita qualquer domínio de produção ou preview do projeto "frontvicstudio" na Vercel
// Ex: frontvicstudio.vercel.app, frontvicstudio-4eg6gz4qv-jvic.vercel.app, etc.
const vercelPreviewRegex = /^https:\/\/frontvicstudio(-[a-z0-9]+)*\.vercel\.app$/;

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
