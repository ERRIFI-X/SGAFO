import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import {
    Award, CheckCircle, Clock, FileText, ChevronRight,
    AlertTriangle, Sparkles, Building2, Search, ArrowRight,
    User, Calendar, Layers, Download, CheckCircle2, Eye, ShieldCheck, Mail
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PlanAttestationSummary {
    id: number;
    titre: string;
    entite: string;
    date_debut: string;
    date_fin: string;
    participants_count: number;
    animateurs_count: number;
    generated_count: number;
    total_expected: number;
    is_completed: boolean;
}

interface AttestationItem {
    id: number;
    type: 'participant' | 'animateur';
    user_nom_complet: string;
    user_email: string;
    plan_titre: string;
    entite: string;
    created_at: string;
    downloaded_at: string | null;
    download_url: string;
}

interface Props {
    plans: PlanAttestationSummary[];
    attestations: AttestationItem[];
}

export default function AttestationsList({ plans, attestations = [] }: Props) {
    const [activeTab, setActiveTab] = useState<'formations' | 'global-certificates'>('formations');
    
    // Search states for both tabs
    const [searchPlan, setSearchPlan] = useState('');
    const [searchCert, setSearchCert] = useState('');
    const [certTypeFilter, setCertTypeFilter] = useState<'all' | 'participant' | 'animateur'>('all');

    // Filter Logic
    const filteredPlans = plans.filter(p =>
        p.titre.toLowerCase().includes(searchPlan.toLowerCase()) ||
        p.entite.toLowerCase().includes(searchPlan.toLowerCase())
    );

    const filteredCerts = attestations.filter(c => {
        const matchesSearch = c.user_nom_complet.toLowerCase().includes(searchCert.toLowerCase()) ||
            c.plan_titre.toLowerCase().includes(searchCert.toLowerCase()) ||
            c.entite.toLowerCase().includes(searchCert.toLowerCase()) ||
            c.user_email.toLowerCase().includes(searchCert.toLowerCase());
        const matchesType = certTypeFilter === 'all' ? true : c.type === certTypeFilter;
        return matchesSearch && matchesType;
    });

    const totalPlans = plans.length;
    const completedPlans = plans.filter(p => p.is_completed).length;
    const totalGenerated = plans.reduce((acc, curr) => acc + curr.generated_count, 0);
    const totalExpected = plans.reduce((acc, curr) => acc + curr.total_expected, 0);
    const totalDownloads = attestations.filter(c => c.downloaded_at !== null).length;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-2 text-sm text-slate-500">
                    <span className="hover:text-blue-600 cursor-pointer transition-colors" onClick={() => router.visit(route('dashboard'))}>
                        Tableau de bord
                    </span>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-slate-900 font-semibold">Attestations</span>
                </div>
            }
        >
            <Head title="Gestion des Attestations" />

            <div className="min-h-screen bg-slate-50/50 p-6 lg:p-10 font-sans">
                <div className="max-w-6xl mx-auto space-y-8">

                    {/* Premium Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="space-y-1">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                                    <Award className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Suivi des Attestations</h1>
                                    <p className="text-sm text-slate-400 font-medium">Pilotez et consultez la génération des attestations pour toutes les formations</p>
                                </div>
                            </div>
                        </div>

                        {/* Search Input conditional on active view */}
                        <div className="relative w-full md:w-80">
                            {activeTab === 'formations' ? (
                                <>
                                    <input
                                        type="text"
                                        placeholder="Rechercher une formation..."
                                        value={searchPlan}
                                        onChange={(e) => setSearchPlan(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all shadow-sm"
                                    />
                                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                </>
                            ) : (
                                <>
                                    <input
                                        type="text"
                                        placeholder="Rechercher par bénéficiaire, email, titre..."
                                        value={searchCert}
                                        onChange={(e) => setSearchCert(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all shadow-sm"
                                    />
                                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                </>
                            )}
                        </div>
                    </div>

                    {/* Stats Dashboard Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50/50 rounded-full -mr-6 -mt-6 transition-transform group-hover:scale-110 duration-500" />
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 relative z-10">Formations validées</p>
                            <p className="text-3xl font-black text-slate-950 relative z-10">{totalPlans}</p>
                        </div>
                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-50/50 rounded-full -mr-6 -mt-6 transition-transform group-hover:scale-110 duration-500" />
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 relative z-10">Générations terminées</p>
                            <p className="text-3xl font-black text-emerald-600 relative z-10">
                                {completedPlans} <span className="text-slate-300 font-bold text-sm">/ {totalPlans}</span>
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-50/50 rounded-full -mr-6 -mt-6 transition-transform group-hover:scale-110 duration-500" />
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 relative z-10">Total Générées</p>
                            <p className="text-3xl font-black text-indigo-600 relative z-10">
                                {totalGenerated} <span className="text-slate-300 font-bold text-sm">/ {totalExpected}</span>
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-violet-50/50 rounded-full -mr-6 -mt-6 transition-transform group-hover:scale-110 duration-500" />
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 relative z-10">Bénéficiaires Ayant Téléchargé</p>
                            <p className="text-3xl font-black text-violet-600 relative z-10">
                                {totalDownloads} <span className="text-slate-300 font-bold text-sm">/ {totalGenerated}</span>
                            </p>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="flex border-b border-slate-200 pb-px">
                        <div className="flex gap-2">
                            <button
                                onClick={() => setActiveTab('formations')}
                                className={`px-5 py-3 text-xs font-black uppercase tracking-wider border-b-2 transition-all ${
                                    activeTab === 'formations'
                                        ? 'border-blue-600 text-blue-600'
                                        : 'border-transparent text-slate-400 hover:text-slate-600'
                                }`}
                            >
                                Suivi par Formation ({totalPlans})
                            </button>
                            <button
                                onClick={() => setActiveTab('global-certificates')}
                                className={`px-5 py-3 text-xs font-black uppercase tracking-wider border-b-2 transition-all ${
                                    activeTab === 'global-certificates'
                                        ? 'border-indigo-600 text-indigo-600'
                                        : 'border-transparent text-slate-400 hover:text-slate-600'
                                }`}
                            >
                                Toutes les Attestations ({attestations.length})
                            </button>
                        </div>
                    </div>

                    {/* Dynamic Tabs Content */}
                    <AnimatePresence mode="wait">
                        {activeTab === 'formations' ? (
                            <motion.div
                                key="formations-tab"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden"
                            >
                                <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                                    <h3 className="text-sm font-black text-slate-900">Formations & Attestations</h3>
                                    <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">
                                        {filteredPlans.length} formation{filteredPlans.length !== 1 ? 's' : ''}
                                    </span>
                                </div>

                                {filteredPlans.length === 0 ? (
                                    <div className="p-16 text-center">
                                        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                            <AlertTriangle className="w-8 h-8 text-slate-300" />
                                        </div>
                                        <p className="text-sm font-bold text-slate-400">Aucune formation validée trouvée.</p>
                                        <p className="text-xs text-slate-300 mt-1">Seules les formations validées et publiées sont disponibles pour les attestations.</p>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                                    <th className="py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Formation / Établissement</th>
                                                    <th className="py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest hidden md:table-cell">Dates</th>
                                                    <th className="py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Bénéficiaires</th>
                                                    <th className="py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Statut Attestations</th>
                                                    <th className="py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100">
                                                {filteredPlans.map((plan) => (
                                                    <tr key={plan.id} className="hover:bg-slate-50/40 transition-colors group">
                                                        <td className="py-5 px-6">
                                                            <div className="min-w-0">
                                                                <p className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">{plan.titre}</p>
                                                                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold mt-1">
                                                                    <Building2 className="w-3.5 h-3.5" />
                                                                    <span>{plan.entite}</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="py-5 px-6 hidden md:table-cell">
                                                            <div className="flex items-center gap-1 text-xs text-slate-500 font-bold">
                                                                <span>{plan.date_debut}</span>
                                                                <span className="text-slate-300">→</span>
                                                                <span>{plan.date_fin}</span>
                                                            </div>
                                                        </td>
                                                        <td className="py-5 px-6 text-center">
                                                            <div className="inline-flex flex-col items-center">
                                                                <span className="text-sm font-bold text-slate-800">{plan.participants_count + plan.animateurs_count}</span>
                                                                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                                                                    ({plan.participants_count} Part. / {plan.animateurs_count} Anim.)
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="py-5 px-6">
                                                            <div className="flex flex-col items-center gap-1">
                                                                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                                                    plan.is_completed
                                                                        ? 'bg-emerald-100 text-emerald-700'
                                                                        : plan.generated_count > 0
                                                                            ? 'bg-amber-100 text-amber-700'
                                                                            : 'bg-slate-100 text-slate-500'
                                                                }`}>
                                                                    {plan.is_completed ? (
                                                                        <>
                                                                            <CheckCircle className="w-3.5 h-3.5" />
                                                                            Terminé
                                                                        </>
                                                                    ) : plan.generated_count > 0 ? (
                                                                        <>
                                                                            <Sparkles className="w-3.5 h-3.5" />
                                                                            En cours
                                                                        </>
                                                                    ) : 'Non généré'}
                                                                </span>
                                                                <span className="text-[10px] font-bold text-slate-400">
                                                                    {plan.generated_count} / {plan.total_expected} envoyées
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="py-5 px-6 text-right">
                                                            <Link
                                                                href={route('admin.attestations.index', plan.id)}
                                                                className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-600/20 text-xs font-black uppercase tracking-widest rounded-xl transition-all"
                                                            >
                                                                Gérer
                                                                <ArrowRight className="w-3.5 h-3.5" />
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="certificates-tab"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                className="space-y-4"
                            >
                                {/* Filter Bar */}
                                <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Type:</span>
                                        <button
                                            onClick={() => setCertTypeFilter('all')}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                                certTypeFilter === 'all'
                                                    ? 'bg-slate-900 text-white'
                                                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                                            }`}
                                        >
                                            Tous ({attestations.length})
                                        </button>
                                        <button
                                            onClick={() => setCertTypeFilter('participant')}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                                certTypeFilter === 'participant'
                                                    ? 'bg-violet-100 text-violet-700 border border-violet-200'
                                                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                                            }`}
                                        >
                                            Participants ({attestations.filter(c => c.type === 'participant').length})
                                        </button>
                                        <button
                                            onClick={() => setCertTypeFilter('animateur')}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                                certTypeFilter === 'animateur'
                                                    ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                                                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                                            }`}
                                        >
                                            Animations ({attestations.filter(c => c.type === 'animateur').length})
                                        </button>
                                    </div>

                                    <div className="text-xs text-slate-400 font-semibold">
                                        Résultat: <span className="text-slate-800 font-black">{filteredCerts.length}</span> attestation(s) trouvée(s)
                                    </div>
                                </div>

                                {/* Table layout */}
                                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                                    {filteredCerts.length === 0 ? (
                                        <div className="p-16 text-center">
                                            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                                <FileText className="w-8 h-8 text-slate-300" />
                                            </div>
                                            <p className="text-sm font-bold text-slate-400">Aucune attestation générée.</p>
                                            <p className="text-xs text-slate-300 mt-1">Générez des attestations pour vos formations validées pour les voir figurer ici.</p>
                                        </div>
                                    ) : (
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left border-collapse">
                                                <thead>
                                                    <tr className="bg-slate-50/50 border-b border-slate-100">
                                                        <th className="py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Bénéficiaire</th>
                                                        <th className="py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Rôle / Type</th>
                                                        <th className="py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Formation de Référence</th>
                                                        <th className="py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date Génération</th>
                                                        <th className="py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Téléchargement</th>
                                                        <th className="py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Fichier</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-100">
                                                    {filteredCerts.map((cert) => {
                                                        const isAnimateur = cert.type === 'animateur';
                                                        return (
                                                            <tr key={cert.id} className="hover:bg-slate-50/40 transition-colors group">
                                                                <td className="py-4 px-6">
                                                                    <div className="flex items-center gap-3">
                                                                        <div className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 font-bold text-xs">
                                                                            <User className="w-4 h-4 text-slate-400" />
                                                                        </div>
                                                                        <div>
                                                                            <p className="text-sm font-bold text-slate-900">{cert.user_nom_complet}</p>
                                                                            <p className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
                                                                                <Mail className="w-3 h-3 text-slate-300" />
                                                                                {cert.user_email}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="py-4 px-6">
                                                                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                                                        isAnimateur
                                                                            ? 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                                                                            : 'bg-violet-50 text-violet-700 border border-violet-100'
                                                                    }`}>
                                                                        {isAnimateur ? 'Animateur' : 'Participant'}
                                                                    </span>
                                                                </td>
                                                                <td className="py-4 px-6">
                                                                    <div className="min-w-0 max-w-[200px]">
                                                                        <p className="text-xs font-bold text-slate-700 truncate">{cert.plan_titre}</p>
                                                                        <p className="text-[10px] text-slate-400 font-semibold flex items-center gap-1 mt-0.5">
                                                                            <Building2 className="w-3 h-3 text-slate-300" />
                                                                            {cert.entite}
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td className="py-4 px-6 text-xs text-slate-500 font-bold">
                                                                    {cert.created_at}
                                                                </td>
                                                                <td className="py-4 px-6 text-center">
                                                                    {cert.downloaded_at ? (
                                                                        <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-bold" title={`Téléchargé le ${cert.downloaded_at}`}>
                                                                            <ShieldCheck className="w-4 h-4 text-emerald-500" />
                                                                            Téléchargé
                                                                        </span>
                                                                    ) : (
                                                                        <span className="text-xs text-slate-400 font-semibold">
                                                                            En attente
                                                                        </span>
                                                                    )}
                                                                </td>
                                                                <td className="py-4 px-6 text-right">
                                                                    <a
                                                                        href={cert.download_url}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-700 hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-600/20 text-xs font-black uppercase tracking-widest rounded-xl transition-all"
                                                                    >
                                                                        <Download className="w-3.5 h-3.5" />
                                                                        PDF
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}

