import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import {
    Award, Download, FileText, ChevronRight,
    Search, Calendar, Layers, Clock, Building2, CheckCircle2
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MyAttestation {
    id: number;
    type: 'participant' | 'animateur';
    plan_titre: string;
    entite: string;
    date_debut: string;
    date_fin: string;
    heures: number;
    created_at: string;
    download_url: string;
}

interface Props {
    attestations: MyAttestation[];
}

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05
        }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 15 } }
};

export default function MyAttestations({ attestations }: Props) {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState<'all' | 'participant' | 'animateur'>('all');

    // Filter Logic
    const filteredAttestations = attestations.filter(att => {
        const matchesSearch = att.plan_titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
            att.entite.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTab = activeTab === 'all' ? true : att.type === activeTab;
        return matchesSearch && matchesTab;
    });

    // Statistics
    const totalCount = attestations.length;
    const totalHours = attestations.reduce((acc, curr) => acc + curr.heures, 0);
    const participantCount = attestations.filter(att => att.type === 'participant').length;
    const animateurCount = attestations.filter(att => att.type === 'animateur').length;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-2 text-sm text-slate-500">
                    <span className="hover:text-blue-600 cursor-pointer transition-colors" onClick={() => router.visit(route('dashboard'))}>
                        Tableau de bord
                    </span>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-slate-900 font-semibold">Mes Attestations</span>
                </div>
            }
        >
            <Head title="Mes Attestations" />

            <div className="min-h-screen bg-slate-50/50 p-6 lg:p-10 font-sans">
                <div className="max-w-6xl mx-auto space-y-8">

                    {/* Premium Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="space-y-1">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 animate-pulse">
                                    <Award className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Mes Attestations</h1>
                                    <p className="text-sm text-slate-400 font-medium">Consultez et téléchargez vos attestations officielles d'animation et de participation</p>
                                </div>
                            </div>
                        </div>

                        {/* Search Input */}
                        <div className="relative w-full md:w-80">
                            <input
                                type="text"
                                placeholder="Rechercher par titre ou entité..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all shadow-sm"
                            />
                            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        </div>
                    </div>

                    {/* Stats Dashboard Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50/50 rounded-full -mr-6 -mt-6 transition-transform group-hover:scale-110 duration-500" />
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 relative z-10">Total Certificats</p>
                            <p className="text-3xl font-black text-slate-950 relative z-10">{totalCount}</p>
                        </div>
                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-50/50 rounded-full -mr-6 -mt-6 transition-transform group-hover:scale-110 duration-500" />
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 relative z-10">Heures Certifiées</p>
                            <p className="text-3xl font-black text-emerald-600 relative z-10">{totalHours}h</p>
                        </div>
                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-50/50 rounded-full -mr-6 -mt-6 transition-transform group-hover:scale-110 duration-500" />
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 relative z-10">Animations (Expert)</p>
                            <p className="text-3xl font-black text-indigo-600 relative z-10">{animateurCount}</p>
                        </div>
                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-violet-50/50 rounded-full -mr-6 -mt-6 transition-transform group-hover:scale-110 duration-500" />
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 relative z-10">Participations</p>
                            <p className="text-3xl font-black text-violet-600 relative z-10">{participantCount}</p>
                        </div>
                    </div>

                    {/* Filter Tabs & Content */}
                    <div className="space-y-6">
                        <div className="flex border-b border-slate-200/60 pb-px">
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setActiveTab('all')}
                                    className={`px-5 py-3 text-xs font-black uppercase tracking-wider border-b-2 transition-all ${
                                        activeTab === 'all'
                                            ? 'border-blue-600 text-blue-600'
                                            : 'border-transparent text-slate-400 hover:text-slate-600'
                                    }`}
                                >
                                    Toutes ({totalCount})
                                </button>
                                <button
                                    onClick={() => setActiveTab('animateur')}
                                    className={`px-5 py-3 text-xs font-black uppercase tracking-wider border-b-2 transition-all ${
                                        activeTab === 'animateur'
                                            ? 'border-indigo-600 text-indigo-600'
                                            : 'border-transparent text-slate-400 hover:text-slate-600'
                                    }`}
                                >
                                    Animations ({animateurCount})
                                </button>
                                <button
                                    onClick={() => setActiveTab('participant')}
                                    className={`px-5 py-3 text-xs font-black uppercase tracking-wider border-b-2 transition-all ${
                                        activeTab === 'participant'
                                            ? 'border-violet-600 text-violet-600'
                                            : 'border-transparent text-slate-400 hover:text-slate-600'
                                    }`}
                                >
                                    Participations ({participantCount})
                                </button>
                            </div>
                        </div>

                        {/* List / Cards Layout */}
                        <AnimatePresence mode="wait">
                            {filteredAttestations.length === 0 ? (
                                <motion.div
                                    key="empty-state"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="bg-white rounded-3xl border border-slate-100 p-16 text-center shadow-sm"
                                >
                                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <FileText className="w-8 h-8 text-slate-300" />
                                    </div>
                                    <p className="text-sm font-bold text-slate-400">Aucune attestation disponible.</p>
                                    <p className="text-xs text-slate-300 mt-1">Vos attestations apparaîtront ici dès qu'elles auront été générées par le Responsable de Formation.</p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="grid"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="show"
                                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                >
                                    {filteredAttestations.map((att) => {
                                        const isAnimateur = att.type === 'animateur';
                                        return (
                                            <motion.div
                                                key={att.id}
                                                variants={cardVariants}
                                                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                                className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-md transition-shadow relative"
                                            >
                                                {/* Visual indicator corner badge */}
                                                <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-10 ${
                                                    isAnimateur ? 'bg-indigo-600' : 'bg-violet-600'
                                                }`} />

                                                <div className="p-6 space-y-4">
                                                    {/* Header Card (Type Badge & Created Date) */}
                                                    <div className="flex items-center justify-between">
                                                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                                            isAnimateur
                                                                ? 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                                                                : 'bg-violet-50 text-violet-700 border border-violet-100'
                                                        }`}>
                                                            <CheckCircle2 className="w-3 h-3" />
                                                            {isAnimateur ? 'Animateur / Expert' : 'Participant'}
                                                        </span>
                                                        <span className="text-[10px] text-slate-400 font-bold">Générée le {att.created_at}</span>
                                                    </div>

                                                    {/* Title & Etablissement */}
                                                    <div className="space-y-1">
                                                        <h3 className="text-base font-black text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                                                            {att.plan_titre}
                                                        </h3>
                                                        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
                                                            <Building2 className="w-3.5 h-3.5 flex-shrink-0" />
                                                            <span className="truncate">{att.entite}</span>
                                                        </div>
                                                    </div>

                                                    {/* Meta information row (Dates & Duration) */}
                                                    <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-slate-500 border-t border-slate-100">
                                                        <div className="flex items-center gap-1.5">
                                                            <Calendar className="w-4 h-4 text-slate-400" />
                                                            <span>{att.date_debut} – {att.date_fin}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5">
                                                            <Clock className="w-4 h-4 text-slate-400" />
                                                            <span>{att.heures} heures</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Bottom Download Area */}
                                                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                                                    <div className="flex items-center gap-1 text-[10px] text-slate-400 font-black uppercase tracking-wider">
                                                        <Layers className="w-3.5 h-3.5" />
                                                        <span>Certificat SGAFO Officiel</span>
                                                    </div>

                                                    <a
                                                        href={att.download_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-black uppercase tracking-widest text-white rounded-xl transition-all shadow-sm ${
                                                            isAnimateur
                                                                ? 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-500/20'
                                                                : 'bg-violet-600 hover:bg-violet-700 hover:shadow-violet-500/20'
                                                        }`}
                                                    >
                                                        <Download className="w-3.5 h-3.5" />
                                                        Télécharger PDF
                                                    </a>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
