"use client";
import { Autocomplete, ListBox, ListBoxItem, SearchField, useFilter } from '@heroui/react';
import React, { useMemo } from 'react';

export interface CountryData {
  name: string;
  code: string;
  indicatif: string;
  flag: string;
  id: string; // Added id for RAC collection
}

const RAW_COUNTRIES = [
  { name: "Bénin", code: "BJ", indicatif: "+229", flag: "🇧🇯" },
  { name: "Afghanistan", code: "AF", indicatif: "+93", "flag": "🇦🇫" },
  { name: "Afrique du Sud", code: "ZA", indicatif: "+27", "flag": "🇿🇦" },
  { name: "Albanie", code: "AL", indicatif: "+355", "flag": "🇦🇱" },
  { name: "Algérie", code: "DZ", indicatif: "+213", "flag": "🇩🇿" },
  { name: "Allemagne", code: "DE", indicatif: "+49", "flag": "🇩🇪" },
  { name: "Andorre", code: "AD", indicatif: "+376", "flag": "🇦🇩" },
  { name: "Angola", code: "AO", indicatif: "+244", "flag": "🇦🇴" },
  { name: "Antigua-et-Barbuda", code: "AG", indicatif: "+1-268", "flag": "🇦🇬" },
  { name: "Arabie Saoudite", code: "SA", indicatif: "+966", "flag": "🇸🇦" },
  { name: "Argentine", code: "AR", indicatif: "+54", "flag": "🇦🇷" },
  { name: "Arménie", code: "AM", indicatif: "+374", "flag": "🇦🇲" },
  { name: "Australie", code: "AU", indicatif: "+61", "flag": "🇦🇺" },
  { name: "Autriche", code: "AT", indicatif: "+43", "flag": "🇦🇹" },
  { name: "Azerbaïdjan", code: "AZ", indicatif: "+994", "flag": "🇦🇿" },
  { name: "Bahamas", code: "BS", indicatif: "+1-242", "flag": "🇧🇸" },
  { name: "Bahreïn", code: "BH", indicatif: "+973", "flag": "🇧🇭" },
  { name: "Bangladesh", code: "BD", indicatif: "+880", "flag": "🇧🇩" },
  { name: "Barbade", code: "BB", indicatif: "+1-246", "flag": "🇧🇧" },
  { name: "Belgique", code: "BE", indicatif: "+32", "flag": "🇧🇪" },
  { name: "Belize", code: "BZ", indicatif: "+501", "flag": "🇧🇿" },
  { name: "Bhoutan", code: "BT", indicatif: "+975", "flag": "🇧🇹" },
  { name: "Biélorussie", code: "BY", indicatif: "+375", "flag": "🇧🇾" },
  { name: "Birmanie", code: "MM", indicatif: "+95", "flag": "🇲🇲" },
  { name: "Bolivie", code: "BO", indicatif: "+591", "flag": "🇧🇴" },
  { name: "Bosnie-Herzégovine", code: "BA", indicatif: "+387", "flag": "🇧🇦" },
  { name: "Botswana", code: "BW", indicatif: "+267", "flag": "🇧🇼" },
  { name: "Brésil", code: "BR", indicatif: "+55", "flag": "🇧🇷" },
  { name: "Brunei", code: "BN", indicatif: "+673", "flag": "🇧🇳" },
  { name: "Bulgarie", code: "BG", indicatif: "+359", "flag": "🇧🇬" },
  { name: "Burkina Faso", code: "BF", indicatif: "+226", "flag": "🇧🇫" },
  { name: "Burundi", code: "BI", indicatif: "+257", "flag": "🇧🇮" },
  { name: "Cambodge", code: "KH", indicatif: "+855", "flag": "🇰🇭" },
  { name: "Cameroun", code: "CM", indicatif: "+237", "flag": "🇨🇲" },
  { name: "Canada", code: "CA", indicatif: "+1", "flag": "🇨🇦" },
  { name: "Cap-Vert", code: "CV", indicatif: "+238", "flag": "🇨🇻" },
  { name: "Chili", code: "CL", indicatif: "+56", "flag": "🇨🇱" },
  { name: "Chine", code: "CN", indicatif: "+86", "flag": "🇨🇳" },
  { name: "Chypre", code: "CY", indicatif: "+357", "flag": "🇨🇾" },
  { name: "Colombie", code: "CO", indicatif: "+57", "flag": "🇨🇴" },
  { name: "Comores", code: "KM", indicatif: "+269", "flag": "🇰🇲" },
  { name: "Congo", code: "CG", indicatif: "+242", "flag": "🇨🇬" },
  { name: "Corée du Nord", code: "KP", indicatif: "+850", "flag": "🇰🇵" },
  { name: "Corée du Sud", code: "KR", indicatif: "+82", "flag": "🇰🇷" },
  { name: "Costa Rica", code: "CR", indicatif: "+506", "flag": "🇨🇷" },
  { name: "Côte d'Ivoire", code: "CI", indicatif: "+225", "flag": "🇨🇮" },
  { name: "Croatie", code: "HR", indicatif: "+385", "flag": "🇭🇷" },
  { name: "Cuba", code: "CU", indicatif: "+53", "flag": "🇨🇺" },
  { name: "Danemark", code: "DK", indicatif: "+45", "flag": "🇩🇰" },
  { name: "Djibouti", code: "DJ", indicatif: "+253", "flag": "🇩🇯" },
  { name: "Dominique", code: "DM", indicatif: "+1-767", "flag": "🇩🇲" },
  { name: "Égypte", code: "EG", indicatif: "+20", "flag": "🇪🇬" },
  { name: "Émirats arabes unis", code: "AE", indicatif: "+971", "flag": "🇦🇪" },
  { name: "Équateur", code: "EC", indicatif: "+593", "flag": "🇪🇨" },
  { name: "Érythrée", code: "ER", indicatif: "+291", "flag": "🇪🇷" },
  { name: "Espagne", code: "ES", indicatif: "+34", "flag": "🇪🇸" },
  { name: "Estonie", code: "EE", indicatif: "+372", "flag": "🇪🇪" },
  { name: "Eswatini", code: "SZ", indicatif: "+268", "flag": "🇸🇿" },
  { name: "États-Unis", code: "US", indicatif: "+1", "flag": "🇺🇸" },
  { name: "Éthiopie", code: "ET", indicatif: "+251", "flag": "🇪🇹" },
  { name: "Fidji", code: "FJ", indicatif: "+679", "flag": "🇫🇯" },
  { name: "Finlande", code: "FI", indicatif: "+358", "flag": "🇫🇮" },
  { name: "France", code: "FR", indicatif: "+33", "flag": "🇫🇷" },
  { name: "Gabon", code: "GA", indicatif: "+241", "flag": "🇬🇦" },
  { name: "Gambie", code: "GM", indicatif: "+220", "flag": "🇬🇲" },
  { name: "Géorgie", code: "GE", indicatif: "+995", "flag": "🇬🇪" },
  { name: "Ghana", code: "GH", indicatif: "+233", "flag": "🇬🇭" },
  { name: "Grèce", code: "GR", indicatif: "+30", "flag": "🇬🇷" },
  { name: "Grenade", code: "GD", indicatif: "+1-473", "flag": "🇬🇩" },
  { name: "Guatemala", code: "GT", indicatif: "+502", "flag": "🇬🇹" },
  { name: "Guinée", code: "GN", indicatif: "+224", "flag": "🇬🇳" },
  { name: "Guinée équatoriale", code: "GQ", indicatif: "+240", "flag": "🇬🇶" },
  { name: "Guinée-Bissau", code: "GW", indicatif: "+245", "flag": "🇬🇼" },
  { name: "Guyana", code: "GY", indicatif: "+592", "flag": "🇬🇾" },
  { name: "Haïti", code: "HT", indicatif: "+509", "flag": "🇭🇹" },
  { name: "Honduras", code: "HN", indicatif: "+504", "flag": "🇭🇳" },
  { name: "Hongrie", code: "HU", indicatif: "+36", "flag": "🇭🇺" },
  { name: "Inde", code: "IN", indicatif: "+91", "flag": "🇮🇳" },
  { name: "Indonésie", code: "ID", indicatif: "+62", "flag": "🇮🇩" },
  { name: "Irak", code: "IQ", indicatif: "+964", "flag": "🇮🇶" },
  { name: "Iran", code: "IR", indicatif: "+98", "flag": "🇮🇷" },
  { name: "Irlande", code: "IE", indicatif: "+353", "flag": "🇮🇪" },
  { name: "Islande", code: "IS", indicatif: "+354", "flag": "🇮🇸" },
  { name: "Israël", code: "IL", indicatif: "+972", "flag": "🇮🇱" },
  { name: "Italie", code: "IT", indicatif: "+39", "flag": "🇮🇹" },
  { name: "Jamaïque", code: "JM", indicatif: "+1-876", "flag": "🇯🇲" },
  { name: "Japon", code: "JP", indicatif: "+81", "flag": "🇯🇵" },
  { name: "Jordanie", code: "JO", indicatif: "+962", "flag": "🇯🇴" },
  { name: "Kazakhstan", code: "KZ", indicatif: "+7", "flag": "🇰🇿" },
  { name: "Kenya", code: "KE", indicatif: "+254", "flag": "🇰🇪" },
  { name: "Kirghizistan", code: "KG", indicatif: "+996", "flag": "🇰🇬" },
  { name: "Kiribati", code: "KI", indicatif: "+686", "flag": "🇰🇮" },
  { name: "Koweït", code: "KW", indicatif: "+965", "flag": "🇰🇼" },
  { name: "Laos", code: "LA", indicatif: "+856", "flag": "🇱🇦" },
  { name: "Lesotho", code: "LS", indicatif: "+266", "flag": "🇱🇸" },
  { name: "Lettonie", code: "LV", indicatif: "+371", "flag": "🇱🇻" },
  { name: "Liban", code: "LB", indicatif: "+961", "flag": "🇱🇧" },
  { name: "Libéria", code: "LR", indicatif: "+231", "flag": "🇱🇷" },
  { name: "Libye", code: "LY", indicatif: "+218", "flag": "🇱🇾" },
  { name: "Liechtenstein", code: "LI", indicatif: "+423", "flag": "🇱🇮" },
  { name: "Lituanie", code: "LT", indicatif: "+370", "flag": "🇱🇹" },
  { name: "Luxembourg", code: "LU", indicatif: "+352", "flag": "🇱🇺" },
  { name: "Macédoine du Nord", code: "MK", indicatif: "+389", "flag": "🇲🇰" },
  { name: "Madagascar", code: "MG", indicatif: "+261", "flag": "🇲🇬" },
  { name: "Malaisie", code: "MY", indicatif: "+60", "flag": "🇲🇾" },
  { name: "Malawi", code: "MW", indicatif: "+265", "flag": "🇲🇼" },
  { name: "Maldives", code: "MV", indicatif: "+960", "flag": "🇲🇻" },
  { name: "Mali", code: "ML", indicatif: "+223", "flag": "🇲🇱" },
  { name: "Malte", code: "MT", indicatif: "+356", "flag": "🇲🇹" },
  { name: "Maroc", code: "MA", indicatif: "+212", "flag": "🇲🇦" },
  { name: "Marshall", code: "MH", indicatif: "+692", "flag": "🇲🇭" },
  { name: "Maurice", code: "MU", indicatif: "+230", "flag": "🇲🇺" },
  { name: "Mauritanie", code: "MR", indicatif: "+222", "flag": "🇲🇷" },
  { name: "Mexique", code: "MX", indicatif: "+52", "flag": "🇲🇽" },
  { name: "Micronésie", code: "FM", indicatif: "+691", "flag": "🇫🇲" },
  { name: "Moldavie", code: "MD", indicatif: "+373", "flag": "🇲🇩" },
  { name: "Monaco", code: "MC", indicatif: "+377", "flag": "🇲🇨" },
  { name: "Mongolie", code: "MN", indicatif: "+976", "flag": "🇲🇳" },
  { name: "Monténégro", code: "ME", indicatif: "+382", "flag": "🇲🇪" },
  { name: "Mozambique", code: "MZ", indicatif: "+258", "flag": "🇲🇿" },
  { name: "Namibie", code: "NA", indicatif: "+264", "flag": "🇳🇦" },
  { name: "Nauru", code: "NR", indicatif: "+674", "flag": "🇳🇷" },
  { name: "Népal", code: "NP", indicatif: "+977", "flag": "🇳🇵" },
  { name: "Nicaragua", code: "NI", indicatif: "+505", "flag": "🇳🇮" },
  { name: "Niger", code: "NE", indicatif: "+227", "flag": "🇳🇪" },
  { name: "Nigeria", code: "NG", indicatif: "+234", "flag": "🇳🇬" },
  { name: "Norvège", code: "NO", indicatif: "+47", "flag": "🇳🇴" },
  { name: "Nouvelle-Zélande", code: "NZ", indicatif: "+64", "flag": "🇳🇿" },
  { name: "Oman", code: "OM", indicatif: "+968", "flag": "🇴🇲" },
  { name: "Ouganda", code: "UG", indicatif: "+256", "flag": "🇺🇬" },
  { name: "Ouzbékistan", code: "UZ", indicatif: "+998", "flag": "🇺🇿" },
  { name: "Pakistan", code: "PK", indicatif: "+92", "flag": "🇵🇰" },
  { name: "Palaos", code: "PW", indicatif: "+680", "flag": "🇵🇼" },
  { name: "Panama", code: "PA", indicatif: "+507", "flag": "🇵🇦" },
  { name: "Papouasie-Nouvelle-Guinée", code: "PG", indicatif: "+675", "flag": "🇵🇬" },
  { name: "Paraguay", code: "PY", indicatif: "+595", "flag": "🇵🇾" },
  { name: "Pays-Bas", code: "NL", indicatif: "+31", "flag": "🇳🇱" },
  { name: "Pérou", code: "PE", indicatif: "+51", "flag": "🇵🇪" },
  { name: "Philippines", code: "PH", indicatif: "+63", "flag": "🇵🇭" },
  { name: "Pologne", code: "PL", indicatif: "+48", "flag": "🇵🇱" },
  { name: "Portugal", code: "PT", indicatif: "+351", "flag": "🇵🇹" },
  { name: "Qatar", code: "QA", indicatif: "+974", "flag": "🇶🇦" },
  { name: "RD Congo", code: "CD", indicatif: "+243", "flag": "🇨🇩" },
  { name: "République centrafricaine", code: "CF", indicatif: "+236", "flag": "🇨🇫" },
  { name: "République dominicaine", code: "DO", indicatif: "+1-809", "flag": "🇩🇴" },
  { name: "République tchèque", code: "CZ", indicatif: "+420", "flag": "🇨🇿" },
  { name: "Roumanie", code: "RO", indicatif: "+40", "flag": "🇷🇴" },
  { name: "Royaume-Uni", code: "GB", indicatif: "+44", "flag": "🇬🇧" },
  { name: "Russie", code: "RU", indicatif: "+7", "flag": "🇷🇺" },
  { name: "Rwanda", code: "RW", indicatif: "+250", "flag": "🇷🇼" },
  { name: "Saint-Christophe-et-Niévès", code: "KN", indicatif: "+1-869", "flag": "🇰🇳" },
  { name: "Sainte-Lucie", code: "LC", indicatif: "+1-758", "flag": "🇱🇨" },
  { name: "Saint-Marin", code: "SM", indicatif: "+378", "flag": "🇸🇲" },
  { name: "Saint-Vincent-et-les-Grenadines", code: "VC", indicatif: "+1-784", "flag": "🇻🇨" },
  { name: "Salomon", code: "SB", indicatif: "+677", "flag": "🇸🇧" },
  { name: "Salvador", code: "SV", indicatif: "+503", "flag": "🇸🇻" },
  { name: "Samoa", code: "WS", indicatif: "+685", "flag": "🇼🇸" },
  { name: "Sao Tomé-et-Principe", code: "ST", indicatif: "+239", "flag": "🇸🇹" },
  { name: "Sénégal", code: "SN", indicatif: "+221", "flag": "🇸🇳" },
  { name: "Serbie", code: "RS", indicatif: "+381", "flag": "🇷🇸" },
  { name: "Seychelles", code: "SC", indicatif: "+248", "flag": "🇸🇨" },
  { name: "Sierra Leone", code: "SL", indicatif: "+232", "flag": "🇸🇱" },
  { name: "Singapour", code: "SG", indicatif: "+65", "flag": "🇸🇬" },
  { name: "Slovaquie", code: "SK", indicatif: "+421", "flag": "🇸🇰" },
  { name: "Slovénie", code: "SI", indicatif: "+386", "flag": "🇸🇮" },
  { name: "Somalie", code: "SO", indicatif: "+252", "flag": "🇸🇴" },
  { name: "Soudan", code: "SD", indicatif: "+249", "flag": "🇸🇩" },
  { name: "Soudan du Sud", code: "SS", indicatif: "+211", "flag": "🇸🇸" },
  { name: "Sri Lanka", code: "LK", indicatif: "+94", "flag": "🇱🇰" },
  { name: "Suède", code: "SE", indicatif: "+46", "flag": "🇸🇪" },
  { name: "Suisse", code: "CH", indicatif: "+41", "flag": "🇨🇭" },
  { name: "Suriname", code: "SR", indicatif: "+597", "flag": "🇸🇷" },
  { name: "Syrie", code: "SY", indicatif: "+963", "flag": "🇸🇾" },
  { name: "Tadjikistan", code: "TJ", indicatif: "+992", "flag": "🇹🇯" },
  { name: "Tanzanie", code: "TZ", indicatif: "+255", "flag": "🇹🇿" },
  { name: "Tchad", code: "TD", indicatif: "+235", "flag": "🇹🇩" },
  { name: "Thaïlande", code: "TH", indicatif: "+66", "flag": "🇹🇭" },
  { name: "Timor oriental", code: "TL", indicatif: "+670", "flag": "🇹🇱" },
  { name: "Togo", code: "TG", indicatif: "+228", "flag": "🇹🇬" },
  { name: "Tonga", code: "TO", indicatif: "+676", "flag": "🇹🇴" },
  { name: "Trinité-et-Tobago", code: "TT", indicatif: "+1-868", "flag": "🇹🇹" },
  { name: "Tunisie", code: "TN", indicatif: "+216", "flag": "🇹🇳" },
  { name: "Turkménistan", code: "TM", indicatif: "+993", "flag": "🇹🇲" },
  { name: "Turquie", code: "TR", indicatif: "+90", "flag": "🇹🇷" },
  { name: "Tuvalu", code: "TV", indicatif: "+688", "flag": "🇹🇻" },
  { name: "Ukraine", code: "UA", indicatif: "+380", "flag": "🇺🇦" },
  { name: "Uruguay", code: "UY", indicatif: "+598", "flag": "🇺🇾" },
  { name: "Vanuatu", code: "VU", indicatif: "+678", "flag": "🇻🇺" },
  { name: "Vatican", code: "VA", indicatif: "+39", "flag": "🇻🇦" },
  { name: "Venezuela", code: "VE", indicatif: "+58", "flag": "🇻🇪" },
  { name: "Vietnam", code: "VN", indicatif: "+84", "flag": "🇻🇳" },
  { name: "Yémen", code: "YE", indicatif: "+967", "flag": "🇾🇪" },
  { name: "Zambie", code: "ZM", indicatif: "+260", "flag": "🇿🇲" },
  { name: "Zimbabwe", code: "ZW", indicatif: "+263", "flag": "🇿🇼" }
];

// Map with explicit ID for RAC collection requirement
const COUNTRIES = RAW_COUNTRIES.map(c => ({ ...c, id: c.code }));

type CountrySelectorProps = {
  value?: string; // countryCode
  onChange: (country: any) => void;
  className?: string;
};

const CountrySelectorComponent = ({ value, onChange, className }: CountrySelectorProps) => {
  const selectedKey = useMemo(() => value || "BJ", [value]);
  const {contains} = useFilter({sensitivity: "base"});

  const handleSelectionChange = (key: any) => {
    if (!key) return;
    const country = COUNTRIES.find(c => c.id === key);
    if (country) {
      onChange(country);
    }
  };

  return (
    <Autocomplete
      value={selectedKey}
      onChange={handleSelectionChange}
      selectionMode='single'
      className={className}
      variant="primary"
      items={COUNTRIES as any}
      placeholder="Sélectionner un pays"
      aria-label="Sélectionner un pays"
    >
      <Autocomplete.Trigger className="flex items-center gap-2 justify-between w-full">
        <Autocomplete.Value className="text-sm font-medium" />
        <Autocomplete.Indicator />
      </Autocomplete.Trigger>
      <Autocomplete.Popover className="z-[100] bg-white border border-divider shadow-2xl rounded-xl min-w-[320px] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <Autocomplete.Filter filter={contains}>
          <div className="p-3 border-b border-divider bg-secondary/5">
            <SearchField className="w-full" aria-label="Rechercher un pays">
              <SearchField.Group className="flex items-center gap-2 bg-secondary/10 px-3 py-2 rounded-lg border border-transparent focus-within:border-primary/50 transition-all">
                <SearchField.SearchIcon className="text-foreground/50 w-4 h-4" />
                <SearchField.Input 
                  placeholder="Rechercher un pays..." 
                  className="bg-transparent border-none outline-none text-sm w-full"
                />
                <SearchField.ClearButton className="text-foreground/30 hover:text-foreground/60 p-1" />
              </SearchField.Group>
            </SearchField>
          </div>
          <ListBox 
              items={COUNTRIES as any}
              className="max-h-[350px] overflow-y-auto p-1 outline-none"
          >
            {(country: any) => (
              <ListBoxItem 
                key={country.id} 
                id={country.id}
                textValue={`${country.flag} ${country.name}`}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-secondary/20 aria-selected:bg-primary aria-selected:text-primary-foreground transition-colors outline-none"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="flex items-center gap-2">
                    <span className="text-xl shrink-0 leading-none">{country.flag}</span>
                    <span className="font-semibold text-sm grow">{country.name}</span>
                    <span className="text-[10px] font-black uppercase tracking-wider">
                      ({country.code})
                    </span>
                  </div>
                  <div className="text-xs font-bold ml-auto shrink-0 opacity-80">
                    {country.indicatif}
                  </div>
                </div>
              </ListBoxItem>
            )}
          </ListBox>
        </Autocomplete.Filter>
      </Autocomplete.Popover>
    </Autocomplete>
  );
};

export default CountrySelectorComponent;
