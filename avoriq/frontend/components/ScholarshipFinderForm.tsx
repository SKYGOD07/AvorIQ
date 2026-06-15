"use client";

import { useState } from "react";
import { StudentProfile } from "../types/scholarship";
import { indianStates } from "../data/scholarships";
import { Sparkles, User, GraduationCap, Search, Check, ChevronDown } from "lucide-react";
import StarBorder from "./reactbits/StarBorder";

interface ScholarshipFinderFormProps {
  onSubmit: (profile: StudentProfile) => void;
  initialProfile: StudentProfile | null;
}

const INCOME_LIMITS: { [key: string]: number } = {
  "Below ₹1 Lakh": 100000,
  "₹1–2.5 Lakhs": 250000,
  "₹2.5–5 Lakhs": 500000,
  "₹5–8 Lakhs": 800000,
  "Above ₹8 Lakhs": 1500000,
};

export default function ScholarshipFinderForm({
  onSubmit,
  initialProfile,
}: ScholarshipFinderFormProps) {
  const [name, setName] = useState(initialProfile?.name || "");
  const [educationLevel, setEducationLevel] = useState(initialProfile?.educationLevel || "Class 11–12");
  const [gender, setGender] = useState(initialProfile?.gender || "Female");
  const [familyIncomeCategory, setFamilyIncomeCategory] = useState(
    initialProfile?.familyIncomeCategory || "₹1–2.5 Lakhs"
  );
  const [state, setState] = useState(initialProfile?.state || "Madhya Pradesh");
  const [disabilityStatus, setDisabilityStatus] = useState(initialProfile?.disabilityStatus || false);
  const [minorityStatus, setMinorityStatus] = useState(initialProfile?.minorityStatus || false);
  const [caste, setCaste] = useState(initialProfile?.caste || "OBC");
  const [fieldOfStudy, setFieldOfStudy] = useState(initialProfile?.fieldOfStudy || "Engineering");
  const [interestCategory, setInterestCategory] = useState(initialProfile?.interestCategory || "All");

  const [stateSearch, setStateSearch] = useState("");
  const [showStatesDropdown, setShowStatesDropdown] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const profile: StudentProfile = {
      name: name || "Scholar student",
      educationLevel,
      gender,
      familyIncome: INCOME_LIMITS[familyIncomeCategory],
      familyIncomeCategory,
      state,
      disabilityStatus,
      minorityStatus,
      caste,
      fieldOfStudy,
      interestCategory,
    };
    onSubmit(profile);
  };

  const filteredStates = indianStates.filter((s) =>
    s.toLowerCase().includes(stateSearch.toLowerCase())
  );

  return (
    <form onSubmit={handleSubmit} className="glass-panel p-6 md:p-8 rounded-3xl space-y-6 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent-purple/5 rounded-full blur-3xl pointer-events-none" />

      <div className="border-b border-white/5 pb-4 mb-6">
        <h2 className="text-white text-xl font-bold flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-accent-purple" />
          Scholarship Match Finder
        </h2>
        <p className="text-slate-400 text-xs mt-1">
          Complete your credentials to run our real-time eligibility intelligence checks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Name */}
        <div className="space-y-1.5">
          <label className="text-slate-300 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-slate-500" />
            Full Name
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Priya Sharma"
            className="w-full px-4 py-3 text-sm rounded-xl glass-input text-white"
          />
        </div>

        {/* Education Level */}
        <div className="space-y-1.5">
          <label className="text-slate-300 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-slate-500" />
            Education Level
          </label>
          <select
            value={educationLevel}
            onChange={(e) => setEducationLevel(e.target.value)}
            className="w-full px-4 py-3 text-sm rounded-xl glass-input text-white appearance-none cursor-pointer focus:bg-navy-card"
          >
            <option value="Class 6–10">Class 6–10 (Secondary School)</option>
            <option value="Class 11–12">Class 11–12 (Higher Secondary)</option>
            <option value="Diploma">Diploma / Vocational</option>
            <option value="UG">Undergraduate (UG Degree)</option>
            <option value="PG">Postgraduate (PG / Ph.D.)</option>
          </select>
        </div>

        {/* Field of Study */}
        <div className="space-y-1.5">
          <label className="text-slate-300 text-xs font-semibold uppercase tracking-wider">
            Field of Study / Stream
          </label>
          <select
            value={fieldOfStudy}
            onChange={(e) => setFieldOfStudy(e.target.value)}
            className="w-full px-4 py-3 text-sm rounded-xl glass-input text-white appearance-none cursor-pointer focus:bg-navy-card"
          >
            <option value="Science">Science (B.Sc, M.Sc, etc.)</option>
            <option value="Commerce">Commerce (B.Com, M.Com, etc.)</option>
            <option value="Arts">Arts & Humanities (B.A., etc.)</option>
            <option value="Engineering">Engineering & Tech (B.Tech/BE/Diploma)</option>
            <option value="Medical">Medical & Healthcare (MBBS/BDS/B.Pharm)</option>
            <option value="Law">Law (LL.B, LL.M)</option>
            <option value="Management">Management (BBA, MBA)</option>
            <option value="Others">Others / Vocational</option>
          </select>
        </div>

        {/* Gender */}
        <div className="space-y-1.5">
          <label className="text-slate-300 text-xs font-semibold uppercase tracking-wider">Gender</label>
          <div className="grid grid-cols-3 gap-2">
            {["Male", "Female", "Other"].map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setGender(g)}
                className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                  gender === g
                    ? "bg-accent-blue/15 border-accent-blue/40 text-white shadow-sm"
                    : "bg-white/[0.02] border-white/[0.06] text-slate-400 hover:text-white"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Family Annual Income */}
        <div className="space-y-1.5">
          <label className="text-slate-300 text-xs font-semibold uppercase tracking-wider">
            Annual Family Income
          </label>
          <select
            value={familyIncomeCategory}
            onChange={(e) => setFamilyIncomeCategory(e.target.value)}
            className="w-full px-4 py-3 text-sm rounded-xl glass-input text-white appearance-none cursor-pointer focus:bg-navy-card"
          >
            <option value="Below ₹1 Lakh">Below ₹1 Lakh</option>
            <option value="₹1–2.5 Lakhs">₹1 – ₹2.5 Lakhs</option>
            <option value="₹2.5–5 Lakhs">₹2.5 – ₹5 Lakhs</option>
            <option value="₹5–8 Lakhs">₹5 – ₹8 Lakhs</option>
            <option value="Above ₹8 Lakhs">Above ₹8 Lakhs</option>
          </select>
        </div>

        {/* State Domicile Searchable select */}
        <div className="space-y-1.5 relative">
          <label className="text-slate-300 text-xs font-semibold uppercase tracking-wider">
            State Domicile
          </label>
          <div
            onClick={() => setShowStatesDropdown(!showStatesDropdown)}
            className="w-full px-4 py-3 text-sm rounded-xl glass-input text-white flex justify-between items-center cursor-pointer"
          >
            <span>{state}</span>
            <ChevronDown className="w-4 h-4 text-slate-500" />
          </div>

          {showStatesDropdown && (
            <div className="absolute top-full left-0 right-0 z-20 mt-1.5 p-3 rounded-xl bg-navy-card border border-white/10 shadow-xl space-y-2 max-h-56 flex flex-col">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search state..."
                  value={stateSearch}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => setStateSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg glass-input text-white focus:outline-none"
                />
              </div>
              <div className="flex-1 overflow-y-auto space-y-1 pr-1">
                {filteredStates.map((st) => (
                  <div
                    key={st}
                    onClick={(e) => {
                      e.stopPropagation();
                      setState(st);
                      setShowStatesDropdown(false);
                      setStateSearch("");
                    }}
                    className={`flex items-center justify-between px-2.5 py-1.5 text-xs rounded-lg cursor-pointer ${
                      state === st
                        ? "bg-accent-blue/15 text-accent-blue font-semibold"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span>{st}</span>
                    {state === st && <Check className="w-3.5 h-3.5" />}
                  </div>
                ))}
                {filteredStates.length === 0 && (
                  <div className="text-slate-500 text-xs p-2 italic text-center">No states found</div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Caste Category */}
        <div className="space-y-1.5">
          <label className="text-slate-300 text-xs font-semibold uppercase tracking-wider">
            Caste Category
          </label>
          <select
            value={caste}
            onChange={(e) => setCaste(e.target.value)}
            className="w-full px-4 py-3 text-sm rounded-xl glass-input text-white appearance-none cursor-pointer focus:bg-navy-card"
          >
            <option value="General">General / Open</option>
            <option value="OBC">OBC (Other Backward Classes)</option>
            <option value="SC">SC (Scheduled Caste)</option>
            <option value="ST">ST (Scheduled Tribe)</option>
            <option value="EWS">EWS (Economically Weaker Section)</option>
          </select>
        </div>

        {/* Scholarship Interest */}
        <div className="space-y-1.5">
          <label className="text-slate-300 text-xs font-semibold uppercase tracking-wider">
            Preferred Category
          </label>
          <select
            value={interestCategory}
            onChange={(e) => setInterestCategory(e.target.value)}
            className="w-full px-4 py-3 text-sm rounded-xl glass-input text-white appearance-none cursor-pointer focus:bg-navy-card"
          >
            <option value="All">All Categories</option>
            <option value="Government">Government Sponsored</option>
            <option value="Private">Private Corporate (CSR)</option>
            <option value="NGO">NGOs & Charitable Trusts</option>
            <option value="International">International / Study Abroad</option>
          </select>
        </div>
      </div>

      {/* Toggles (Disability and Minority Status) */}
      <div className="grid grid-cols-2 gap-4 pt-2">
        <label className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] cursor-pointer hover:bg-white/[0.04] transition-colors">
          <input
            type="checkbox"
            checked={disabilityStatus}
            onChange={(e) => setDisabilityStatus(e.target.checked)}
            className="w-4.5 h-4.5 rounded border-white/10 text-accent-blue bg-white/5 focus:ring-accent-blue cursor-pointer"
          />
          <div>
            <span className="text-white text-xs font-semibold block">Differently Abled</span>
            <span className="text-slate-500 text-[10px]">PWD Disability Status</span>
          </div>
        </label>

        <label className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] cursor-pointer hover:bg-white/[0.04] transition-colors">
          <input
            type="checkbox"
            checked={minorityStatus}
            onChange={(e) => setMinorityStatus(e.target.checked)}
            className="w-4.5 h-4.5 rounded border-white/10 text-accent-blue bg-white/5 focus:ring-accent-blue cursor-pointer"
          />
          <div>
            <span className="text-white text-xs font-semibold block">Minority Community</span>
            <span className="text-slate-500 text-[10px]">Religious / Linguistic</span>
          </div>
        </label>
      </div>

      <StarBorder as="div" color="#2563EB" className="w-full mt-6">
        <button
          type="submit"
          className="w-full py-4 rounded-xl text-sm font-bold text-white bg-navy-card shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_30px_rgba(124,58,237,0.3)] hover:bg-navy-card/80 transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-accent-purple" />
          Find Scholarships
        </button>
      </StarBorder>
    </form>
  );
}
