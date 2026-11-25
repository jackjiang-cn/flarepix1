const OPT_IN_COUNTRIES = new Set([
  "AT", "BE", "BG", "CH", "CY", "CZ", "DE", "DK", "EE", "ES", "FI", "FR",
  "GB", "GR", "HR", "HU", "IE", "IS", "IT", "LI", "LT", "LU", "LV", "MT",
  "NL", "NO", "PL", "PT", "RO", "SE", "SI", "SK",
]);

const OTHER_CONTINENTS = new Set(["AF", "AN", "AS", "NA", "OC", "SA"]);

export function GET(request: Request) {
  const behindCloudflare = Boolean(request.headers.get("cf-ray"));
  const country = request.headers.get(behindCloudflare ? "cf-ipcountry" : "x-vercel-ip-country")?.trim().toUpperCase();
  const continent = request.headers.get("x-vercel-ip-continent")?.trim().toUpperCase();

  let mode: "opt-in" | "opt-out" = "opt-in";

  if (country && /^[A-Z]{2}$/.test(country) && country !== "XX" && country !== "ZZ") {
    mode = OPT_IN_COUNTRIES.has(country) ? "opt-in" : "opt-out";
  } else if (!behindCloudflare && !country && continent && OTHER_CONTINENTS.has(continent)) {
    mode = "opt-out";
  } else if (process.env.NODE_ENV === "development" && !behindCloudflare && !country && !continent) {
    mode = "opt-out";
  }

  return Response.json({ mode }, { headers: { "Cache-Control": "private, no-store" } });
}
