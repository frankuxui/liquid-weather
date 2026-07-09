import type { Continent } from "./types";

const EUROPE = "AD AL AT AX BA BE BG BY CH CY CZ DE DK EE ES FI FO FR GB GG GI GR HR HU IE IM IS IT JE LI LT LU LV MC MD ME MK MT NL NO PL PT RO RS RU SE SI SK SM TR UA VA".split(" ");
const NORTH_AMERICA = "US CA MX BM GL PM".split(" ");
const CENTRAL_AMERICA_CARIBBEAN = "BZ CR SV GT HN NI PA AG AI AW BB BQ BS CU CW DM DO GD GP HT JM KN KY LC MF MQ MS PR SX TC TT VC VG VI".split(" ");
const SOUTH_AMERICA = "AR BO BR CL CO EC FK GF GY PE PY SR UY VE".split(" ");
const ASIA = "AE AF AM AZ BD BH BN BT CN GE HK ID IL IN IQ IR JO JP KG KH KP KR KW KZ LA LB LK MM MN MO MV MY NP OM PH PK PS QA SA SG SY TH TJ TL TM TW UZ VN YE".split(" ");
const AFRICA = "AO BF BI BJ BW CD CF CG CI CM CV DJ DZ EG EH ER ET GA GH GM GN GQ GW KE KM LR LS LY MA MG ML MR MU MW MZ NA NE NG RE RW SC SD SL SN SO SS ST SZ TD TG TN TZ UG YT ZA ZM ZW".split(" ");
const OCEANIA = "AS AU CK FJ FM GU KI MH MP NC NF NR NU NZ PF PG PW SB TO TV VU WF WS".split(" ");

const LOOKUP: Record<string, Continent> = {};
for (const code of EUROPE) LOOKUP[code] = "Europa";
for (const code of NORTH_AMERICA) LOOKUP[code] = "América del Norte";
for (const code of CENTRAL_AMERICA_CARIBBEAN) LOOKUP[code] = "América Central y Caribe";
for (const code of SOUTH_AMERICA) LOOKUP[code] = "América del Sur";
for (const code of ASIA) LOOKUP[code] = "Asia";
for (const code of AFRICA) LOOKUP[code] = "África";
for (const code of OCEANIA) LOOKUP[code] = "Oceanía";

/** Best-effort continent for an ISO-3166 alpha-2 country code, from geocoding results. */
export function continentFromCountryCode(countryCode: string): Continent {
  return LOOKUP[countryCode.toUpperCase()] ?? "Asia";
}

const SOUTH_AMERICA_ZONES = [
  "Argentina",
  "Sao_Paulo",
  "Santiago",
  "Bogota",
  "Lima",
  "Caracas",
  "La_Paz",
  "Montevideo",
  "Asuncion",
  "Guayaquil",
  "Cayenne",
  "Paramaribo",
  "Manaus",
  "Recife",
  "Fortaleza"
];
const CENTRAL_AMERICA_ZONES = [
  "Costa_Rica",
  "Panama",
  "Havana",
  "Santo_Domingo",
  "Guatemala",
  "Belize",
  "Managua",
  "Tegucigalpa",
  "El_Salvador",
  "Jamaica",
  "Port-au-Prince",
  "Nassau",
  "Barbados",
  "Grenada"
];

/**
 * Best-effort continent from an IANA timezone name, for locations added by
 * coordinates where no country code is available.
 */
export function continentFromTimezone(timezone: string): Continent {
  const [area, rest = ""] = timezone.split("/");
  switch (area) {
    case "Europe":
      return "Europa";
    case "Africa":
      return "África";
    case "Asia":
    case "Indian":
      return "Asia";
    case "Australia":
    case "Pacific":
    case "Antarctica":
      return "Oceanía";
    case "Atlantic":
      return "Europa";
    case "America":
      if (SOUTH_AMERICA_ZONES.some((z) => rest.startsWith(z))) return "América del Sur";
      if (CENTRAL_AMERICA_ZONES.some((z) => rest.startsWith(z))) return "América Central y Caribe";
      return "América del Norte";
    default:
      return "Asia";
  }
}
