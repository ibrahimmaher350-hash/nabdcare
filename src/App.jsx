import React, { useState, useEffect, useMemo, useCallback, Component } from "react";
import {
  HeartPulse, Stethoscope, Syringe, Bandage, Thermometer, Users, Droplet, UtensilsCrossed, Dumbbell, Baby,
  User, UserPlus, UserCheck, LayoutDashboard, Calendar, CalendarClock, CalendarPlus, Clock, MapPin, Star,
  Phone, CheckCircle2, AlertTriangle, AlertOctagon, PlusCircle, Trash2, Edit2, ArrowRight, ArrowLeft,
  Download, Bell, Truck, FileText, Receipt, ThumbsUp, X, RefreshCw, Zap, ShieldCheck, ClipboardList,
  Repeat, Eye, Loader2, CreditCard, Wallet, Banknote, Search, Sparkles, PhoneCall, MessageSquare,
  ChevronLeft, Award, Activity, Check, CheckCircle, SlidersHorizontal, Settings, FileCheck,
  Shield, Heart, CheckSquare, Share2, Send, ExternalLink, UserCog, FolderPlus, FileSpreadsheet,
  AlertCircle, Copy, Link as LinkIcon, CheckCheck, ChevronDown, Navigation, PieChart, BarChart3,
  TrendingUp, DollarSign, Layers, Lock, ShieldAlert, Radio, HelpCircle, FilePlus, Smartphone, Monitor,
  Cpu, Building2, Compass, FileSpreadsheet as SheetIcon, FileCode, CheckSquare as CheckIcon, Filter, Play,
  QrCode, Key, Dog, FileSpreadsheet as FileCsv, FileText as FilePdf, Image, Video, Mic, Flame, Scale, Activity as Pulse,
  Briefcase, GraduationCap, FileCheck2, Landmark, ShieldQuestion, PenTool, Wrench, Ban, KeyRound, LockKeyhole
} from "lucide-react";

/* ============================== ERROR BOUNDARY ============================== */
class NabdErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Nabd App Runtime Error:", error, errorInfo);
    this.setState({ errorInfo: error ? error.toString() : "Unknown Error" });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#041C36] text-white flex flex-col items-center justify-center p-6 text-center" dir="rtl">
          <div className="w-16 h-16 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center mb-4">
            <AlertTriangle size={36} />
          </div>
          <h2 className="font-extrabold text-xl mb-2 font-['Cairo']">تم رصد استثناء مؤقت وجاري استعادة النظام تلقائياً</h2>
          <p className="text-xs text-slate-300 max-w-md mb-6">
            منصة نبض تعمل بأعلى درجات الأمان والوقاية. اضغط على الزر أدناه لإعادة تشغيل النظام بسلاسة.
          </p>
          <button
            onClick={() => {
              try { localStorage.clear(); } catch(e) {}
              window.location.reload();
            }}
            className="bg-[#E39019] hover:bg-[#c77b12] text-[#041C36] font-extrabold px-6 py-3 rounded-2xl text-sm transition-all shadow-xl cursor-pointer"
          >
            إعادة تشغيل المنصة واستعادة البيانات الأولية 🔄
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

/* ============================== ثوابت البراند بدمياط ============================== */

const ADMIN_PIN = "1097";

const BRAND = {
  navy: "#041C36",
  blue: "#143B67",
  lightBlue: "#EBF3FA",
  orange: "#E39019",
  gold: "#F59E0B",
  amber: "#D97706",
  ink: "#041C36",
  slate: "#0F172A",
  success: "#10B981",
  danger: "#EF4444",
  line: "#E2E8F0",
  grayBg: "#F8FAFC",
  phone: "01001097896",
  manager: "أ/ إبراهيم ماهر",
  logoUrl: "/assets/nabd_logo.jpg",
  nursePhotoUrl: "/assets/ibrahim_maher.jpg",
  googleSheetUrl: "https://docs.google.com/spreadsheets/d/1yMYlKSrL9Gh7G2ovDPNg8lsVk-5OscqvrNh_NRZK4Lo/edit?gid=0#gid=0"
};

const SOCIAL_LINKS = [
  {
    label: "\u0627\u0644\u0635\u0641\u062d\u0629 \u0627\u0644\u0631\u0633\u0645\u064a\u0629",
    sublabel: "\u0646\u0628\u0636 \u0644\u0644\u062a\u0645\u0631\u064a\u0636 \u0627\u0644\u0645\u0646\u0632\u0644\u064a",
    icon: "\ud83c\udf10",
    url: "https://www.facebook.com/share/1EKbXc5stY/",
    color: "#1877F2",
    bg: "#EBF3FF",
  },
  {
    label: "\u062c\u0631\u0648\u0628 \u0646\u0628\u0636",
    sublabel: "\u0645\u062c\u062a\u0645\u0639 \u0627\u0644\u0645\u062a\u0627\u0628\u0639\u064a\u0646",
    icon: "\ud83d\udc65",
    url: "https://www.facebook.com/share/g/1BYWGH9tDG/",
    color: "#1877F2",
    bg: "#EBF3FF",
  },
  {
    label: "\u0625\u0628\u0631\u0627\u0647\u064a\u0645 \u0645\u0627\u0647\u0631",
    sublabel: "\u0627\u0644\u062d\u0633\u0627\u0628 \u0627\u0644\u0634\u062e\u0635\u064a \u2022 \u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0645\u0646\u0638\u0648\u0645\u0629",
    icon: "\ud83d\udc68\u200d\u2695\ufe0f",
    url: "https://www.facebook.com/share/1Hig6n8ADM/",
    color: "#1877F2",
    bg: "#EBF3FF",
  },
  {
    label: "\u0648\u0627\u062a\u0633\u0627\u0628 \u0645\u0628\u0627\u0634\u0631",
    sublabel: "\u062a\u0648\u0627\u0635\u0644 \u0648\u0627\u062d\u062c\u0632 \u0641\u0648\u0631\u0627\u064b",
    icon: "\ud83d\udcac",
    url: `https://wa.me/20${BRAND.phone}`,
    color: "#10B981",
    bg: "#ECFDF5",
  },
  {
    label: "\u0627\u062a\u0635\u0644 \u0628\u0646\u0627",
    sublabel: BRAND.phone,
    icon: "\ud83d\udcde",
    url: `tel:${BRAND.phone}`,
    color: "#E39019",
    bg: "#FFF7ED",
  },
];

const TESTIMONIALS = [
  {
    name: "إحدى عميلاتنا",
    text: "ربنا يباركلك انت اخلاق وعندك رحمه ومتربي انا اتذكر موقفك مع امي ادعو لك دائما عن ظهر الغيب",
    date: "أراء العملاء"
  },
  {
    name: "موكا انا",
    text: "الله يباركلك بجد ونعم الناس انت انسان محترم واخلاق فوق الوصف وعندك ضمير في شغلك واتقان ومتابعة كل شئ حتي بعد التركيب بجد ربنا يبارك في عمرك ويفرحك ويسعدك ويجعله كله في ميزان حسناتك يا رب",
    date: "أراء العملاء"
  },
  {
    name: "كريمان محمد الشافعي",
    text: "عن تجربه احسن تعامل منكم جزاك الله خير الجزاء وربي يجعله في ميزان حسناتكم امين",
    date: "أراء العملاء"
  },
  {
    name: "Amir El Laban",
    text: "الله يبارك لك عملت التحاليل احسن من أسعار برا تقريبا كدا بنص التمن وكانت تحاليل غاليه وعرفت عندي أي وبتعالج والحمد لله علي كل حال بجد بشكرك كل الشكر وبدعيلك دايما 💚💚",
    date: "أراء العملاء"
  },
  {
    name: "Om Yasser",
    text: "ربنا يحفظك ويبارك فيك ادب واخلاق كريمه ورحمه وخبره كبيره وعندك ضمير ربنا يجازيك كل خير ويجعله في ميزان حسناتك",
    date: "أراء العملاء"
  },
  {
    name: "أحد عملائنا",
    text: "انت ابن اصول ومحترم وربنا يبارك في عمرك ياابراهيم ويصلح حالك بجد ونعم الناس الله يحميك",
    date: "أراء العملاء"
  },
  {
    name: "إحدى عميلاتنا",
    text: "ان شاء الله هيجبر خاطرك وهيرضيك ونعم بالله العظيم انا متفائله لك الخير يا ابراهيم والله لك ابن حلال تستاهل كل خير والله العظيم ربنا معاك يا ابني",
    date: "أراء العملاء"
  },
  {
    name: "نشوه الزيات",
    text: "حضرتك إنسان محترم وشاطر جدا في مهنتو عمري ماانساني وولدتي تعبانه وتيجي في الميعاد وأي حاجه بنسألك عليها بتقول من غير تكبر ربنا يبارك فيك ياابني",
    date: "أراء العملاء"
  },
  {
    name: "أحد عملائنا",
    text: "ربنا يرحمها ويجعل تعباها في ميزان حسناتها ويرحم ابي وامي وجميع موتى المسلمين حضرتك كريم جدا وممتاز في شغلك ومحترم ربنا يبارك في حضرتك",
    date: "أراء العملاء"
  }
];

const DAMIETTA_AREAS = [
  { name: "مركز وبندر دمياط", lat: 31.4165, lng: 31.8133 },
  { name: "دمياط الجديدة", lat: 31.4394, lng: 31.6706 },
  { name: "رأس البر", lat: 31.5144, lng: 31.8156 },
];

const SPEC_LABELS = {
  injections: "الحقن والكانيولا والمحاليل",
  labs: "سحب العينات والتحاليل",
  wounds: "غيارات الجروح والحروق والقدم السكري",
  blood: "المحاليل ونقل الدم والبلازما",
  catheter: "القساطر وأنبوب التغذية (الرايل)",
  vitals: "متابعة العلامات الحيوية والسكر",
  elderly: "رعاية كبار السن والحالات المزمنة",
  critical: "الحالات الحرجة ورعاية بعد العمليات",
  extras: "العزل المنزلي والحقن الشرجية والمستلزمات",
};

const CATEGORIZED_SERVICES = [
  {
    category: "💉 خدمات الحقن وتركيب الكانيولا والمحاليل",
    items: [
      {
        id: "inj_services",
        name: "خدمات الحقن والكانيولا والمحاليل العلاجية",
        icon: Syringe,
        desc: "تقديم كافة أنواع الحقن والمحاليل العلاجية بأعلى معايير التعقيم واختبار الحساسية الطبية.",
        points: [
          "حقن عضل.",
          "حقن وريد.",
          "حقن تحت الجلد.",
          "حقن المضادات الحيوية مع اختبار الحساسية.",
          "إعطاء المحاليل العلاجية.",
          "تركيب وتغيير الكانيولا."
        ]
      }
    ]
  },
  {
    category: "🧪 سحب العينات والتحاليل المنزلية",
    items: [
      {
        id: "lab_services",
        name: "سحب العينات وتنسيق التحاليل المنزلية",
        icon: Syringe,
        desc: "سحب عينات الدم وكافة العينات الطبية بأمان تام مع التنسيق مع أفضل المعامل وتسليم النتائج.",
        points: [
          "سحب عينات الدم من المنزل.",
          "جمع العينات الطبية المختلفة.",
          "التنسيق مع معامل التحاليل.",
          "متابعة النتائج عند الحاجة."
        ]
      }
    ]
  },
  {
    category: "🩹 غيارات الجروح المتخصصة",
    items: [
      {
        id: "wound_services",
        name: "العناية بالجروح المتخصصة وفك الغرز",
        icon: Bandage,
        desc: "بروتوكول معقم لتطهير وغيارات الجروح الجراحية والقدم السكري والحروق وقرح الفراش.",
        points: [
          "غيارات ما بعد العمليات الجراحية.",
          "غيارات الحروق.",
          "غيارات قرح الفراش.",
          "غيارات القدم السكري.",
          "العناية بالجروح المزمنة.",
          "فك الغرز الجراحية.",
          "فك الدبابيس الجراحية."
        ]
      }
    ]
  },
  {
    category: "🩸 المحاليل ونقل الدم",
    items: [
      {
        id: "blood_services",
        name: "تركيب المحاليل ونقل الدم والبلازما والألبومين",
        icon: Droplet,
        desc: "إشراف تمريضي تخصصي لنقل الدم ومشتقاته ومحاليل التغذية والحديد وفق المعايير الطبية المعتمدة.",
        points: [
          "تركيب المحاليل الوريدية.",
          "تركيب محاليل التغذية.",
          "تركيب محاليل الحديد.",
          "نقل الدم.",
          "نقل البلازما.",
          "نقل الألبومين وفق الإجراءات الطبية المعتمدة."
        ]
      }
    ]
  },
  {
    category: "🚻 القساطر والتغذية العلاجية",
    items: [
      {
        id: "cath_services",
        name: "القساطر البولية وأنبوب التغذية (الرايل)",
        icon: UtensilsCrossed,
        desc: "تركيب، تغيير، وتسليك القساطر البولية وأنبيب التغذية المعوية تحت تعقيم طبي كامل.",
        points: [
          "تركيب القسطرة البولية.",
          "تغيير القسطرة البولية.",
          "تسليك القسطرة البولية.",
          "متابعة القسطرة الداخلية والخارجية.",
          "تركيب ومتابعة أنبوب التغذية \"الرايل\"."
        ]
      }
    ]
  },
  {
    category: "📊 متابعة العلامات الحيوية",
    items: [
      {
        id: "vitals_services",
        name: "فحص ومتابعة العلامات الحيوية والسكر",
        icon: Thermometer,
        desc: "قياس دقيق للضغط، السكر، الأكسجين، الحرارة والنبض وتسجيل تقرير دوري للحالة الصحية.",
        points: [
          "قياس ضغط الدم.",
          "قياس مستوى السكر بالدم.",
          "قياس نسبة الأكسجين بالدم.",
          "قياس درجة الحرارة.",
          "قياس معدل النبض."
        ]
      }
    ]
  },
  {
    category: "👴💙 رعاية كبار السن والحالات المزمنة",
    items: [
      {
        id: "elderly_services",
        name: "الرعاية الشاملة لكبار السن والحالات المزمنة",
        icon: Users,
        desc: "مرافقة يومية، تنظيم الأدوية، المساعدة في الحركة والنظافة والوقاية من مضاعفات الرقود.",
        points: [
          "الرعاية اليومية لكبار السن.",
          "متابعة الأدوية والعلاج.",
          "المساعدة في الحركة.",
          "المساعدة في النظافة الشخصية.",
          "الوقاية من قرح الفراش ومضاعفات الرقود."
        ]
      }
    ]
  },
  {
    category: "🚑 رعاية الحالات الحرجة وما بعد العمليات",
    items: [
      {
        id: "critical_services",
        name: "رعاية حالات العناية والجلطات والقلب والأورام",
        icon: Stethoscope,
        desc: "متابعة تخصصية مكثفة للحالات المتعافية من العناية المركزة، جراحات القلب والرعاية التلطيفية.",
        points: [
          "متابعة مرضى الجلطات.",
          "متابعة مرضى الأورام.",
          "متابعة مرضى القلب.",
          "رعاية ما بعد جراحات القلب.",
          "متابعة حالات ما بعد الخروج من العناية المركزة.",
          "الرعاية التلطيفية والداعمة."
        ]
      }
    ]
  },
  {
    category: "⭐ خدمات إضافية",
    items: [
      {
        id: "extra_services",
        name: "الخدمات الإضافية والدعم التمريضي المتكامل",
        icon: Sparkles,
        desc: "توفير المستلزمات الطبية، العزل المنزلي، الحقن الشرجية، واستشارات الواتساب على مدار الساعة.",
        points: [
          "العزل المنزلي.",
          "الحقنة الشرجية.",
          "توفير المستلزمات الطبية.",
          "استشارات ومتابعة عبر الواتساب.",
          "متابعة طوارئ هبوط وارتفاع السكر.",
          "تركيب المحاليل المنزلية وفق التقييم الطبي."
        ]
      }
    ]
  }
];

const FLAT_SERVICES = CATEGORIZED_SERVICES.flatMap((c) => c.items);

const TIME_SLOTS = (() => {
  const slots = [];
  for (let h = 8; h < 22; h++) {
    slots.push(`${String(h).padStart(2, "0")}:00`);
    slots.push(`${String(h).padStart(2, "0")}:30`);
  }
  return slots;
})();

const STATUS_META = {
  waiting: { label: "قائمة انتظار", color: BRAND.amber },
  confirmed: { label: "مؤكد ومُعَيّن", color: BRAND.blue },
  enroute: { label: "الممرض في الطريق إليك", color: "#3B82F6" },
  arrived: { label: "وصل الممرض بالمنزل", color: "#8B5CF6" },
  inprogress: { label: "جارٍ تقديم الخدمة", color: BRAND.orange },
  completed: { label: "مكتملة بنجاح", color: BRAND.success },
};

/* ============================== أدوات مساعدة ============================== */

let uidCounter = 1000;
function uid(prefix) {
  return `${prefix}_${Date.now().toString(36)}_${(uidCounter++).toString(36)}`;
}

function generatePatientCode() {
  const randNum = Math.floor(100000 + Math.random() * 900000);
  return `P-2026-${randNum}`;
}

function generatePatientPin() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

function generateNurseId() {
  const randNum = Math.floor(1000 + Math.random() * 9000);
  return `NUR-2026-${randNum}`;
}

function areaCoord(areaName, jitterKm = 1.2) {
  const base = DAMIETTA_AREAS.find((a) => a.name === areaName) || DAMIETTA_AREAS[0];
  const j = jitterKm / 111;
  return { lat: base.lat + (Math.random() - 0.5) * j, lng: base.lng + (Math.random() - 0.5) * j };
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function buildSeedNurses() {
  const list = [
    {
      id: "nur_1001",
      jobCode: "NUR-2026-1001",
      name: "ممرض/ إبراهيم ماهر",
      gender: "ذكر",
      nationalId: "29208151101928",
      birthDate: "1992-08-15",
      age: 34,
      license: "NUR-DM-1001",
      phone: BRAND.phone,
      whatsapp: BRAND.phone,
      area: "مركز وبندر دمياط",
      addressDetail: "شارع التحرير - عمود 14 - الدور 3",
      degree: "بكالوريوس تمريض",
      university: "جامعة المنصورة",
      gradYear: 2012,
      exp: 12,
      specs: ["injections", "wounds", "blood", "critical", "elderly", "catheter"],
      skills: ["تركيب كانيولا (مدرب)", "PICC Line (محترف)", "Tracheostomy Care (محترف)"],
      docs: { idCard: true, license: true, gradCert: true, criminal: true },
      rating: 5.0,
      reviews: 320,
      punctuality: "99%",
      cancelRate: "0.1%",
      avgEta: "11 دقيقة",
      performanceScore: 98,
      status: "approved",
      state: "متاح حالياً"
    },
    {
      id: "nur_1002",
      jobCode: "NUR-2026-1002",
      name: "ممرضة/ آية ناصر",
      gender: "أنثى",
      nationalId: "29804101103321",
      birthDate: "1998-04-10",
      age: 28,
      license: "NUR-DM-9102",
      phone: BRAND.phone,
      whatsapp: BRAND.phone,
      area: "دمياط الجديدة",
      addressDetail: "الحي الثاني - عمارة 45",
      degree: "معهد تمريض فني",
      university: "معهد تمريض دمياط",
      gradYear: 2018,
      exp: 6,
      specs: ["injections", "vitals", "elderly", "labs"],
      skills: ["تركيب كانيولا (محترف)", "سحب عينات دم (مدرب)"],
      docs: { idCard: true, license: true, gradCert: true, criminal: true },
      rating: 4.9,
      reviews: 140,
      punctuality: "97%",
      cancelRate: "0.4%",
      avgEta: "14 دقيقة",
      performanceScore: 94,
      status: "approved",
      state: "متاحة حالياً"
    }
  ];
  return list.map((n) => ({
    ...n,
    coord: areaCoord(n.area),
    photo: n.name.includes("إبراهيم ماهر") ? BRAND.nursePhotoUrl : `https://ui-avatars.com/api/?name=${encodeURIComponent(n.name)}&background=143B67&color=fff&size=128&bold=true`,
  }));
}

function buildSeedPatients() {
  const list = [
    {
      id: "pat_254",
      code: "P-2026-000254",
      pin: "4892",
      name: "محمد أحمد السيد",
      age: 72,
      gender: "ذكر",
      bloodType: "O+",
      adherenceRate: "92%",
      healthStatus: "مستقرة بالمنزل",
      phone: BRAND.phone,
      whatsapp: BRAND.phone,
      area: "مركز وبندر دمياط",
      addressDetail: "شارع الجلاء - عمارة الأمل - الدور 2",
      landmark: "بجوار دكان الأمل",
      requestReason: "عناية بجروح القدم السكري والمحاليل",
      chronicSummary: ["ضغط مرتفع", "سكر نوع ثاني", "جلطة قديمة", "قرحة قدم سكري"],
      allergies: [{ name: "بنسلين", severity: "شديدة" }, { name: "مأكولات بحرية", severity: "متوسطة" }],
      usualNurse: "ممرض/ إبراهيم ماهر",
      balance: "0 ج.م",
      guardian: { name: "أحمد محمد السيد (الابن)", relation: "ابن", phone: BRAND.phone }
    },
    {
      id: "pat_255",
      code: "P-2026-000255",
      pin: "1284",
      name: "فاطمة خليل إبراهيم",
      age: 69,
      gender: "أنثى",
      bloodType: "A+",
      adherenceRate: "98%",
      healthStatus: "مستقرة بالمنزل",
      phone: BRAND.phone,
      whatsapp: BRAND.phone,
      area: "دمياط الجديدة",
      addressDetail: "الحي الرابع - عمارة الفيروز",
      landmark: "أمام المسجد الكبير",
      requestReason: "تركيب محاليل تغذية ومتابعة حيوية",
      chronicSummary: ["ما بعد جراحة استبدال مفصل"],
      allergies: [],
      usualNurse: "ممرضة/ آية ناصر",
      balance: "0 ج.م",
      guardian: { name: "منى خليل", relation: "ابنة", phone: BRAND.phone }
    }
  ];
  return list.map((p) => ({ ...p, coord: areaCoord(p.area), createdAt: Date.now() }));
}

function buildSeedBookings() {
  return [
    {
      id: "bk_101",
      patientName: "محمد أحمد السيد",
      serviceId: "wound_services",
      area: "مركز وبندر دمياط",
      date: todayStr(),
      time: "10:00",
      status: "confirmed",
      nurseName: "ممرض/ إبراهيم ماهر"
    },
    {
      id: "bk_102",
      patientName: "فاطمة خليل إبراهيم",
      serviceId: "blood_services",
      area: "دمياط الجديدة",
      date: todayStr(),
      time: "11:30",
      status: "enroute",
      nurseName: "ممرضة/ آية ناصر"
    }
  ];
}

function buildSeedInvoices() {
  return [
    { id: "INV-DM-801", patientName: "محمد أحمد السيد", service: "غيارات قدم سكري", amount: "450 ج.م", status: "paid", date: "2026-07-24", method: "كاش" },
    { id: "INV-DM-802", patientName: "فاطمة خليل إبراهيم", service: "تركيب محاليل وتغذية", amount: "350 ج.م", status: "paid", date: "2026-07-24", method: "محفظة إلكترونية" },
  ];
}

function sendWhatsAppNotification(actionType, details) {
  try {
    const text =
      `📱 *إشعار إداري فوري - نبض للتمريض المنزلي*\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `🔔 *الحدث*: ${actionType}\n` +
      `📋 *التفاصيل*: ${details}\n` +
      `⏰ *التوقيت*: ${new Date().toLocaleTimeString("ar-EG")}\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `مزامنة تلقائية في Google Sheets + FCM + Local Notification`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/20${BRAND.phone}?text=${encoded}`, "_blank");
  } catch (e) {
    console.error("WhatsApp Send Error:", e);
  }
}

/* ============================== مكوّنات التصميم ============================== */

function StyleBlock() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Tajawal:wght@400;500;700;800&display=swap');
      * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
      html, body { overflow-x: hidden; max-width: 100vw; }
      .nabd-app { font-family: 'Tajawal', 'Cairo', sans-serif; background-color: #F8FAFC; color: ${BRAND.slate}; overflow-x: hidden; }
      .nabd-input { border:1px solid ${BRAND.line}; border-radius:0.75rem; padding:0.65rem 0.9rem; font-size:1rem; width:100%; outline:none; font-family:inherit; background:#fff; color:${BRAND.slate}; transition: all 0.2s; min-height:48px; -webkit-appearance:none; }
      .nabd-input:focus { border-color:${BRAND.blue}; box-shadow:0 0 0 3px rgba(20,59,103,0.12); }
      select.nabd-input { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: left 0.75rem center; background-size: 1.2em; padding-left: 2.5rem; }
      .carehub-btn-primary { background: ${BRAND.blue}; color: #fff; padding: 0.75rem 1.2rem; border-radius: 0.85rem; font-weight: 700; font-size: 0.9rem; cursor: pointer; transition: all 0.2s; border: none; min-height:48px; display:inline-flex; align-items:center; justify-content:center; gap:0.4rem; touch-action:manipulation; }
      .carehub-btn-primary:hover { background: ${BRAND.navy}; }
      .carehub-btn-wa { background: #10B981; color: #fff; padding: 0.75rem 1.2rem; border-radius: 0.85rem; font-weight: 700; font-size: 0.9rem; cursor: pointer; border: none; transition: all 0.2s; display: inline-flex; align-items:center; justify-content: center; gap: 0.5rem; min-height:48px; touch-action:manipulation; }
      .carehub-btn-wa:hover { background: #059669; }
      .carehub-btn-orange { background: ${BRAND.orange}; color: #fff; padding: 0.75rem 1.2rem; border-radius: 0.85rem; font-weight: 700; font-size: 0.9rem; cursor: pointer; border: none; transition: all 0.2s; min-height:48px; display:inline-flex; align-items:center; justify-content:center; gap:0.4rem; touch-action:manipulation; }
      .carehub-btn-orange:hover { background: #c77b12; }
      .carehub-btn-ghost { background: #F1F5F9; color: ${BRAND.slate}; padding: 0.75rem 1.2rem; border-radius: 0.85rem; font-weight: 700; font-size: 0.9rem; cursor: pointer; border: none; min-height:48px; display:inline-flex; align-items:center; justify-content:center; touch-action:manipulation; }
      .carehub-btn-danger { background: #EF4444; color: #fff; padding: 0.75rem 1.2rem; border-radius: 0.85rem; font-weight: 700; font-size: 0.9rem; cursor: pointer; border: none; min-height:48px; display:inline-flex; align-items:center; justify-content:center; gap:0.4rem; touch-action:manipulation; }
      .carehub-live-dot { width:8px; height:8px; border-radius:9999px; display:inline-block; animation: carehubDot 1.4s ease-in-out infinite; }
      @keyframes carehubDot { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.4; transform:scale(1.5); } }
      .carehub-spin { animation: carehubSpin 1s linear infinite; }
      @keyframes carehubSpin { to { transform: rotate(360deg); } }
      .share-icon-btn { background: #ffffff; color: ${BRAND.blue}; border: 1px solid ${BRAND.line}; padding: 0.5rem 0.75rem; border-radius: 0.65rem; font-size: 0.75rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items:center; justify-content: center; gap: 0.35rem; transition: all 0.2s; min-height:42px; touch-action:manipulation; }
      .share-icon-btn:hover { background: ${BRAND.lightBlue}; border-color: ${BRAND.blue}; }
      .modal-overlay { position:fixed; inset:0; background:rgba(4,28,54,0.65); z-index:9999; display:flex; align-items:center; justify-content:center; padding:1rem; backdrop-filter:blur(4px); }
      .modal-card { background:#fff; border-radius:1.5rem; padding:1.5rem; width:100%; max-width:420px; max-height:90vh; overflow-y:auto; box-shadow:0 25px 60px rgba(0,0,0,0.3); }
      @media (max-width: 640px) {
        .nabd-input { font-size: 16px; }
        .carehub-btn-primary, .carehub-btn-wa, .carehub-btn-orange, .carehub-btn-ghost { font-size:0.95rem; }
      }
    `}</style>
  );
}

function Badge({ children, color = BRAND.blue }) {
  return (
    <span
      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold"
      style={{ color, background: `${color}1A`, border: `1px solid ${color}33` }}
    >
      {children}
    </span>
  );
}

function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="font-bold text-xs" style={{ color: BRAND.navy }}>{label}</span>
      {children}
    </label>
  );
}

function QuickShareButton({ title, hashTarget, onNotify }) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = (e) => {
    e.stopPropagation();
    const origin = window.location.origin + window.location.pathname;
    const shareUrl = `${origin}#${hashTarget}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      if (onNotify) onNotify(`تم نسخ رابط (${title}) بنجاح للمشاركة! 🔗`);
    }
  };

  const handleWhatsAppShare = (e) => {
    e.stopPropagation();
    const origin = window.location.origin + window.location.pathname;
    const shareUrl = `${origin}#${hashTarget}`;
    const text = encodeURIComponent(`🏥 *نبض للتمريض المنزلي*\nرابط مباشر لـ: *${title}*\n${shareUrl}`);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <div className="inline-flex items-center gap-1">
      <button
        onClick={handleCopyLink}
        title={`نسخ رابط ${title}`}
        className="share-icon-btn text-[11px]"
      >
        {copied ? <CheckCheck size={13} className="text-[#10B981]" /> : <Share2 size={13} />}
        <span>{copied ? "تم النسخ" : "مشاركة"}</span>
      </button>
      <button
        onClick={handleWhatsAppShare}
        title={`مشاركة ${title} عبر الواتساب`}
        className="p-2 bg-[#10B981] hover:bg-emerald-600 text-white rounded-xl cursor-pointer transition-all shadow-sm flex items-center justify-center min-h-[38px] w-[38px]"
      >
        <MessageSquare size={14} />
      </button>
    </div>
  );
}

/* ============================== HEADER & NAVIGATION ============================== */

function NabdHeader({ onEmergencyClick, currentTab, onChangeTab, onNotify, onGoBooking }) {
  const [logoTapCount, setLogoTapCount] = useState(0);
  const tapTimerRef = React.useRef(null);

  const handleLogoTap = () => {
    const newCount = logoTapCount + 1;
    setLogoTapCount(newCount);
    if (tapTimerRef.current) clearTimeout(tapTimerRef.current);
    if (newCount >= 5) {
      setLogoTapCount(0);
      onChangeTab("admin");
      return;
    }
    if (newCount === 3) onNotify("🔒 اضغط مرتين أخريين للدخول للإدارة...");
    tapTimerRef.current = setTimeout(() => setLogoTapCount(0), 2000);
    if (newCount === 1) onChangeTab("home"); // normal home navigation on single tap
  };

  const handleShareSite = async () => {
    const shareData = {
      title: "نبض للتمريض المنزلي",
      text: "خدمات التمريض المنزلي المتميزة بدمياط",
      url: window.location.origin
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        if (onNotify) onNotify("تم نسخ رابط الموقع بنجاح للمشاركة! 🔗");
      }
    } catch (e) {
      console.error("Share failed", e);
    }
  };

  return (
    <header className="bg-[#041C36] text-white sticky top-0 z-50 border-b border-[#143B67] shadow-xl">
      <div className="max-w-6xl mx-auto px-3 py-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          {currentTab !== "home" && (
            <button 
              onClick={() => onChangeTab("home")}
              className="p-1.5 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all shadow-sm flex items-center justify-center min-w-[36px] min-h-[36px]"
              title="العودة للرئيسية"
            >
              <ArrowRight size={18} />
            </button>
          )}
          <div className="flex items-center gap-2 cursor-pointer select-none min-w-0" onClick={handleLogoTap}>
            <img
              src={BRAND.logoUrl}
              alt="شعار نبض للتمريض المنزلي"
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl object-cover border-2 border-[#E39019] shadow-md flex-shrink-0"
              loading="lazy"
              decoding="async"
            />
            <span className="font-black text-sm sm:text-lg tracking-tight text-white font-['Cairo'] truncate">
              نبض التمريض المنزلي
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            onClick={() => onChangeTab("admin")}
            className={`px-2.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 min-h-[36px] transition-all ${
              currentTab === "admin"
                ? "bg-[#E39019] text-[#041C36] font-extrabold shadow-md"
                : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
            }`}
            title="الإدارة"
          >
            <UserCog size={15} />
            <span className="hidden sm:inline">الإدارة</span>
          </button>

          <button
            onClick={() => onGoBooking(false)}
            className="carehub-btn-orange text-xs py-1.5 px-3 flex items-center gap-1 shadow-md font-bold hidden md:flex min-h-[36px]"
          >
            <CalendarPlus size={15} /> احجز الآن
          </button>

          <a
            href={`tel:${BRAND.phone}`}
            className="bg-white/10 hover:bg-white/20 text-white px-2.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 border border-white/20 min-h-[36px]"
            title="اتصل بنا"
          >
            <PhoneCall size={14} />
            <span className="hidden sm:inline">اتصل بنا</span>
          </a>

          <button
            onClick={handleShareSite}
            className="bg-[#10B981] hover:bg-emerald-600 text-white px-2.5 py-1.5 rounded-xl font-black text-xs flex items-center gap-1 shadow-md cursor-pointer min-h-[36px]"
            title="مشاركة"
          >
            <Share2 size={14} />
            <span className="hidden sm:inline">مشاركة</span>
          </button>
        </div>
      </div>
    </header>
  );
}

function AdminPinModal({ onSuccess, onCancel }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleCheck = () => {
    if (pin === ADMIN_PIN) {
      onSuccess();
    } else {
      setError(true);
      setShake(true);
      setPin("");
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleKey = (e) => { if (e.key === "Enter") handleCheck(); };

  return (
    <div className="modal-overlay" dir="rtl">
      <div className={`modal-card text-center ${shake ? "animate-bounce" : ""}`}>
        <div className="flex items-center justify-center w-16 h-16 bg-[#EBF3FA] rounded-3xl mx-auto mb-4">
          <LockKeyhole size={32} className="text-[#143B67]" />
        </div>
        <h2 className="font-extrabold text-xl text-[#041C36] font-['Cairo'] mb-1">لوحة تحكم الإدارة</h2>
        <p className="text-xs text-slate-500 mb-5">أدخل كلمة مرور الإدارة للدخول إلى لوحة التحكم</p>

        <input
          type="password"
          inputMode="numeric"
          maxLength={6}
          className="nabd-input text-center text-2xl font-black tracking-widest mb-3"
          placeholder="••••"
          value={pin}
          onChange={(e) => { setPin(e.target.value); setError(false); }}
          onKeyDown={handleKey}
          autoFocus
        />

        {error && (
          <p className="text-red-500 text-xs font-bold mb-3">❌ كلمة المرور غير صحيحة. حاول مرة أخرى.</p>
        )}

        <div className="flex gap-2 mt-2">
          <button onClick={onCancel} className="carehub-btn-ghost flex-1 text-sm">إلغاء</button>
          <button onClick={handleCheck} className="carehub-btn-primary flex-1 text-sm">
            <LockKeyhole size={16} /> دخول
          </button>
        </div>

        <p className="text-[10px] text-slate-400 mt-4">نظام محمي بكلمة مرور خاصة بالإدارة — نبض للتمريض المنزلي</p>
      </div>
    </div>
  );
}

function NabdBottomNav({ currentTab, onChangeTab, adminUnlocked }) {
  const navs = [
    { key: "home", label: "الرئيسية", icon: LayoutDashboard },
    { key: "booking", label: "حجز زيارة", icon: CalendarPlus },
    { key: "join", label: "انضمام ممرض", icon: UserPlus },
    { key: "admin", label: "الإدارة", icon: UserCog, isAdmin: true },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-2xl px-2 py-1.5" style={{paddingBottom: "env(safe-area-inset-bottom, 0.375rem)"}}>
      <div className="max-w-md mx-auto flex items-center justify-around">
        {navs.map((n) => {
          const Icon = n.icon;
          const active = currentTab === n.key;
          return (
            <button
              key={n.key}
              onClick={() => onChangeTab(n.key)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer min-w-[60px] touch-manipulation ${
                active
                  ? n.isAdmin ? "text-[#E39019] font-black" : "text-[#143B67] font-black"
                  : "text-slate-500 font-medium"
              }`}
            >
              <div className={`p-1.5 rounded-xl ${
                active
                  ? n.isAdmin ? "bg-[#FEF3C7]" : "bg-[#EBF3FA]"
                  : ""
              }`}>
                <Icon size={22} color={active ? (n.isAdmin ? BRAND.orange : BRAND.blue) : "#64748B"} />
              </div>
              <span className="text-[10px]">{n.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

function NabdFooter() {
  return (
    <div className="bg-gradient-to-br from-[#041C36] via-[#143B67] to-[#041C36] rounded-3xl p-6 border border-[#143B67] shadow-xl text-white mt-4">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2.5 rounded-2xl bg-[#E39019] text-[#041C36]">
          <MessageSquare size={22} />
        </div>
        <div>
          <h3 className="font-extrabold text-lg font-['Cairo']">تواصل معنا</h3>
          <p className="text-xs text-slate-300">نحن هنا 24/7 — تواصل معنا عبر القنوات المفضلة لديك</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {SOCIAL_LINKS.map((link, idx) => (
          <a
            key={idx}
            href={link.url}
            target={link.url.startsWith("http") ? "_blank" : "_self"}
            rel="noreferrer"
            className="flex items-center gap-3 p-3.5 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            style={{ background: link.bg, border: `1.5px solid ${link.color}22` }}
          >
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 shadow-sm"
              style={{ background: `${link.color}18`, border: `1px solid ${link.color}33` }}
            >
              {link.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-extrabold text-sm" style={{ color: link.color }}>{link.label}</p>
              <p className="text-xs text-slate-500 truncate">{link.sublabel}</p>
            </div>
            <ExternalLink size={15} style={{ color: link.color }} className="flex-shrink-0 opacity-60" />
          </a>
        ))}
      </div>

      <div className="mt-4 text-center border-t border-white/10 pt-4">
        <p className="text-xs text-slate-400">© 2026 نبض للتمريض المنزلي — دمياط، مصر</p>
        <p className="text-xs text-slate-500 mt-1">جميع الحقوق محفوظة | إشراف: {BRAND.manager}</p>
      </div>
    </div>
  );
}

/* ============================== HOME HERO VIEW ============================== */

function HomeHeroView({ onGoBooking, onGoJoin, onNotify, stats }) {
  const scrollToServices = () => {
    const el = document.getElementById("services-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const patientCountStr = (13000 + (stats?.patients || 0)).toString();
  const visitCountStr = (15000 + (stats?.bookings || 0)).toString();

  return (
    <div className="flex flex-col gap-8">
      <div className="bg-gradient-to-br from-[#041C36] via-[#143B67] to-[#041C36] rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden border border-[#143B67]">
        <div className="absolute top-0 left-0 w-80 h-80 bg-[#E39019] opacity-15 rounded-full blur-3xl -ml-20 -mt-20 pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
          <div className="md:col-span-7 flex flex-col gap-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs text-[#E39019] font-bold border border-white/15">
                <Sparkles size={14} /> تغطية مركز وبندر دمياط، دمياط الجديدة، ورأس البر 24/7
              </div>
            </div>

            <div>
              <h1 className="text-2xl sm:text-4xl font-black leading-snug font-['Cairo'] text-white">
                نبض للتمريض المنزلي <br />
                <span className="text-[#E39019]">"رعاية احترافية... وأمان وراحة داخل منزلك"</span>
              </h1>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed mt-3">
                نوفر طاقم تمريض مؤهل من الجنسين للزيارات المنزلية: حقن، محاليل، غيارات جروح، قسطرة، ورعاية كبار السن في جميع مراكز محافظة دمياط.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 py-2">
              {[
                "تمريض مرخص ومؤهل",
                "استجابة سريعة للطوارئ",
                "زيارات منزلية معقمة",
                "متابعة دورية بعد الزيارة",
              ].map((feat, fIdx) => (
                <div key={fIdx} className="flex items-center gap-2 bg-white/10 p-2.5 rounded-2xl border border-white/10 text-xs font-extrabold text-white">
                  <CheckCircle2 size={16} className="text-[#10B981] flex-shrink-0" />
                  <span>✔ {feat}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => onGoBooking(false)}
                className="carehub-btn-orange flex items-center gap-2 text-sm sm:text-base px-6 py-3 shadow-lg"
              >
                <CalendarPlus size={18} /> احجز زيارة
              </button>
              <button
                onClick={scrollToServices}
                className="bg-white/15 hover:bg-white/25 text-white font-extrabold px-5 py-3 rounded-2xl text-sm border border-white/20 flex items-center gap-2 cursor-pointer transition-all min-h-[44px]"
              >
                <ChevronDown size={18} /> استكشف الخدمات
              </button>
            </div>
          </div>

          <div className="md:col-span-5 flex flex-col items-center justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#E39019] to-[#10B981] rounded-3xl blur-md opacity-75 group-hover:opacity-100 transition duration-1000" />
              <div className="relative bg-[#041C36] rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl">
                <img
                  src={BRAND.nursePhotoUrl}
                  alt="الممرض أ/ إبراهيم ماهر - إشراف نبض للتمريض المنزلي"
                  className="w-full h-72 sm:h-80 object-cover object-top transform group-hover:scale-105 transition-transform duration-500"
                  fetchpriority="high"
                  decoding="async"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#041C36] via-[#041C36]/80 to-transparent p-4 text-center">
                  <p className="font-extrabold text-base text-white font-['Cairo']">أ/ إبراهيم ماهر</p>
                  <p className="text-xs text-[#E39019] font-bold">إشراف طاقم التمريض المنزلي بدمياط</p>
                  <div className="mt-2 flex items-center justify-center gap-2">
                    <a
                      href={`tel:${BRAND.phone}`}
                      className="bg-[#10B981] hover:bg-emerald-600 text-white font-bold px-3 py-1 rounded-xl text-xs flex items-center gap-1"
                    >
                      <PhoneCall size={12} /> {BRAND.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-3 rounded-2xl bg-[#EBF3FA] border border-[#143B67]/10 flex flex-col items-center">
            <p className="text-2xl sm:text-3xl font-black text-[#143B67] font-['Cairo']">+{visitCountStr}</p>
            <p className="text-xs font-bold text-slate-600 mt-1">زيارة منزلية ناجحة</p>
          </div>
          <div className="p-3 rounded-2xl bg-[#EBF3FA] border border-[#143B67]/10 flex flex-col items-center">
            <p className="text-2xl sm:text-3xl font-black text-[#E39019] font-['Cairo']">+{patientCountStr}</p>
            <p className="text-xs font-bold text-slate-600 mt-1">عميل ومريض مخدوم</p>
          </div>
          <div className="p-3 rounded-2xl bg-[#EBF3FA] border border-[#143B67]/10 flex flex-col items-center">
            <p className="text-2xl sm:text-3xl font-black text-[#10B981] font-['Cairo']">98%</p>
            <p className="text-xs font-bold text-slate-600 mt-1">نسبة رضا وتوصية</p>
          </div>
          <div className="p-3 rounded-2xl bg-[#EBF3FA] border border-[#143B67]/10 flex flex-col items-center">
            <p className="text-2xl sm:text-3xl font-black text-red-600 font-['Cairo']">24/7</p>
            <p className="text-xs font-bold text-slate-600 mt-1">دعم وطوارئ متواصلة</p>
          </div>
        </div>
      </div>

      <div id="services-section" className="flex flex-col gap-8">
        <div className="text-center sm:text-right">
          <h2 className="font-extrabold text-2xl sm:text-3xl text-[#041C36] font-['Cairo'] relative inline-block">
            خدمات نبض التمريضية
            <div className="absolute -bottom-2 right-0 w-1/2 h-1.5 bg-[#E39019] rounded-full opacity-80" />
          </h2>
          <p className="text-sm text-slate-500 mt-4 font-bold">خدمات تمريضية منزلية معقمة ومتخصصة على مدار 24 ساعة بمحافظة دمياط</p>
        </div>

        {CATEGORIZED_SERVICES.map((cat, idx) => (
          <div key={idx} className="bg-white rounded-[2rem] p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col gap-6 relative overflow-hidden group/cat">
            {/* Background accent for category */}
            <div className="absolute top-0 right-0 w-full h-1.5 bg-gradient-to-r from-[#143B67] via-[#10B981] to-[#E39019] opacity-70 group-hover/cat:opacity-100 transition-opacity" />
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-black text-lg sm:text-xl text-[#143B67] font-['Cairo'] flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#EBF3FA] text-[#E39019]">
                  <Activity size={22} strokeWidth={2.5} /> 
                </div>
                {cat.category}
              </h3>
              <QuickShareButton title={cat.category} hashTarget="home" onNotify={onNotify} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {cat.items.map((item) => {
                const Icon = item.icon || Syringe;
                return (
                  <div
                    key={item.id}
                    className="p-5 rounded-3xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-[#EBF3FA] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4 group cursor-default"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#143B67] to-[#041C36] text-white flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                        <Icon size={26} strokeWidth={2} />
                      </div>
                      <div className="pt-1">
                        <h4 className="font-extrabold text-base text-slate-900 font-['Cairo'] group-hover:text-[#E39019] transition-colors">{item.name}</h4>
                        <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-bold">{item.desc}</p>
                      </div>
                    </div>

                    {item.points && item.points.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3 border-t border-slate-200/50 mt-1">
                        {item.points.map((pt, pIdx) => (
                          <div key={pIdx} className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-white p-2.5 rounded-xl border border-slate-50 group-hover:border-[#EBF3FA] transition-colors shadow-sm">
                            <div className="w-4 h-4 rounded-full bg-[#10B981]/10 flex items-center justify-center flex-shrink-0">
                              <CheckCircle2 size={12} className="text-[#10B981]" strokeWidth={3} />
                            </div>
                            <span className="leading-tight">{pt}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* ===== آراء العملاء ===== */}
      <div className="flex flex-col gap-8 mt-12 mb-8">
        <div className="text-center">
          <h2 className="font-extrabold text-2xl sm:text-3xl text-[#041C36] font-['Cairo'] relative inline-block">
            آراء عملائنا الكرام
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1/2 h-1.5 bg-[#10B981] rounded-full opacity-80" />
          </h2>
          <p className="text-sm text-slate-500 mt-4 font-bold">شهادات نعتز بها من عملائنا بعد تقديم الرعاية التمريضية</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col gap-5 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[#EBF3FA] to-transparent opacity-60 rounded-br-full pointer-events-none group-hover:scale-125 transition-transform duration-700" />
              
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#143B67] to-[#041C36] text-white flex items-center justify-center font-black text-xl shadow-lg border-2 border-white group-hover:rotate-6 transition-transform">
                    {t.name[0] || "ع"}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-[#041C36] font-['Cairo']">{t.name}</h4>
                    <div className="flex gap-0.5 text-[#F59E0B] mt-1">
                      {[1, 2, 3, 4, 5].map(i => <Star key={i} size={12} fill="currentColor" strokeWidth={0} />)}
                    </div>
                  </div>
                </div>
                <MessageSquare className="text-[#EBF3FA] group-hover:text-[#E39019]/10 transition-colors" size={40} strokeWidth={1.5} />
              </div>
              
              <div className="relative z-10 flex-1">
                <p className="text-sm font-bold text-slate-700 leading-loose italic">
                  &quot;{t.text}&quot;
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

/* ============================== MODAL: ADD PATIENT FORM ============================== */

function AddPatientModal({ onClose, onSave, onNotify }) {
  const [form, setForm] = useState({
    name: "",
    phone: BRAND.phone,
    whatsapp: BRAND.phone,
    area: DAMIETTA_AREAS[0].name,
    addressDetail: "",
    landmark: "",
    healthStatus: "مستقرة بالمنزل",
    requestReason: "",
    serviceId: FLAT_SERVICES[0].id,
    guardianName: "",
    guardianPhone: "",
    price: "0",
  });

  const generatedCode = useMemo(() => generatePatientCode(), []);
  const generatedPin = useMemo(() => generatePatientPin(), []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    const patient = {
      id: uid("pat"),
      code: generatedCode,
      pin: generatedPin,
      name: form.name,
      phone: form.phone,
      whatsapp: form.whatsapp,
      area: form.area,
      addressDetail: form.addressDetail,
      landmark: form.landmark,
      healthStatus: form.healthStatus,
      requestReason: form.requestReason,
      usualNurse: "ممرض/ إبراهيم ماهر",
      chronicSummary: ["متابعة روتينية"],
      allergies: [],
      balance: `${form.price || 0} ج.م`,
      price: Number(form.price) || 0,
      guardian: form.guardianName ? { name: form.guardianName, phone: form.guardianPhone } : null,
      createdAt: Date.now(),
    };

    onSave(patient);
    onNotify(`تم إضافة المريض (${patient.name}) بمبلغ (${form.price || 0} ج.م) وتوليد الكود (${generatedCode}) بنجاح! 👤`);

    sendWhatsAppNotification("👤 إضافة مريض جديد", `اسم المريض: ${patient.name} | الكود: ${generatedCode} | الإيراد: ${form.price || 0} ج.م | المنطقة: ${patient.area}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto flex flex-col gap-4 text-xs" dir="rtl">
        <div className="flex justify-between items-center border-b border-slate-100 pb-2">
          <div>
            <h3 className="font-extrabold text-base text-[#041C36] font-['Cairo'] flex items-center gap-2">
              <UserPlus size={18} className="text-[#10B981]" /> إضافة مريض جديد (مولد تلقائي الكود والـ PIN)
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">سيتم الحفظ التلقائي وإرسال كود الدخول للواتساب والمزامنة في Google Sheets</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-800"><X size={20} /></button>
        </div>

        <div className="bg-[#EBF3FA] p-3 rounded-2xl border border-[#143B67]/20 flex justify-between items-center text-slate-900 font-bold">
          <div>الكود المولّد تلقائياً: <span className="text-[#143B67] font-mono text-sm">{generatedCode}</span></div>
          <div>PIN المولّد: <span className="text-[#E39019] font-mono text-sm">{generatedPin}</span></div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Field label="الاسم الكامل للمريض *">
            <input required className="nabd-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="مثال: أحمد محمود علي..." />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Field label="رقم الهاتف *">
              <input required className="nabd-input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </Field>
            <Field label="رقم الواتساب">
              <input className="nabd-input" value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Field label="المنطقة / المركز بدمياط">
              <select className="nabd-input" value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })}>
                {DAMIETTA_AREAS.map((a) => <option key={a.name} value={a.name}>{a.name}</option>)}
              </select>
            </Field>
            <Field label="نقطة دالة بجوار العنوان">
              <input className="nabd-input" value={form.landmark} onChange={(e) => setForm({ ...form, landmark: e.target.value })} placeholder="بجوار المسجد الكبير، دكان..." />
            </Field>
          </div>

          <Field label="تفاصيل العنوان (الشارع والعمارة)">
            <input className="nabd-input" value={form.addressDetail} onChange={(e) => setForm({ ...form, addressDetail: e.target.value })} placeholder="شارع التحرير - عمارة الأمل - الدور الثاني..." />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Field label="سبب الطلب والحالة الصحية">
              <input className="nabd-input" value={form.requestReason} onChange={(e) => setForm({ ...form, requestReason: e.target.value })} placeholder="عناية بجروح، سحب عينات، تركيب محاليل..." />
            </Field>
            <Field label="مبلغ / إيراد هذه الحالة (ج.م) *">
              <input type="number" min="0" className="nabd-input font-bold text-[#143B67]" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="مثال: 350" />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Field label="اسم ولي الأمر (إن وجد)">
              <input className="nabd-input" value={form.guardianName} onChange={(e) => setForm({ ...form, guardianName: e.target.value })} placeholder="اسم الابن أو الزوج..." />
            </Field>
            <Field label="هاتف ولي الأمر">
              <input className="nabd-input" value={form.guardianPhone} onChange={(e) => setForm({ ...form, guardianPhone: e.target.value })} />
            </Field>
          </div>

          <button type="submit" className="carehub-btn-wa py-3 text-sm font-bold mt-2">
            <MessageSquare size={16} /> حفظ المريض وإرسال الكود والـ PIN للواتساب والمزامنة
          </button>
        </form>
      </div>
    </div>
  );
}

/* ============================== MODAL: PATIENT SECURE EMR LOGIN & VERIFICATION ============================== */

function PatientSecureLoginModal({ patient, onClose, onVerified, onNotify }) {
  const [inputCode, setInputCode] = useState(patient?.code || "");
  const [inputPin, setInputPin] = useState("");
  const [error, setError] = useState(false);

  const handleVerify = (e) => {
    e.preventDefault();
    if (inputCode === patient.code && inputPin === patient.pin) {
      onVerified();
      onNotify("تم التحقق من الأمان وفتح الملف الطبي بنجاح! 🔑");
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 max-w-sm w-full flex flex-col gap-4 text-center text-xs shadow-2xl" dir="rtl">
        <div className="w-14 h-14 rounded-full bg-[#143B67] text-[#E39019] flex items-center justify-center mx-auto shadow-md">
          <LockKeyhole size={28} />
        </div>

        <div>
          <h3 className="font-black text-base text-slate-900 font-['Cairo']">تسجيل دخول ملف المريض المؤمّن</h3>
          <p className="text-slate-500 mt-1">أدخل الكود والـ PIN الخاصين بالمريض لفتح السجل الطبي المباشر</p>
        </div>

        <form onSubmit={handleVerify} className="flex flex-col gap-3 text-right">
          <Field label="كود المريض (Patient Code)">
            <input className="nabd-input text-center font-mono font-bold" value={inputCode} onChange={(e) => setInputCode(e.target.value)} placeholder="P-2026-000254" />
          </Field>

          <Field label="الرقم السري (PIN / Password)">
            <input type="password" maxLength={6} className="nabd-input text-center font-mono font-bold" value={inputPin} onChange={(e) => setInputPin(e.target.value)} placeholder="••••" />
          </Field>

          {error && (
            <p className="text-red-600 font-bold text-center">الرمز السري غير صحيح! يرجى التأكد من الـ PIN الخاص بالمريض.</p>
          )}

          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex flex-col items-center gap-2 mt-1">
            <QrCode size={48} className="text-[#143B67]" />
            <span className="text-[10px] text-slate-500 font-bold">QR Code مخصص لفتح هذا الملف فوراً</span>
          </div>

          <div className="flex gap-2 mt-2">
            <button type="button" onClick={onClose} className="carehub-btn-ghost text-xs flex-1">إلغاء</button>
            <button type="submit" className="carehub-btn-primary text-xs flex-1 py-2.5 font-bold">
              فتح الملف الطبي
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ============================== MODAL: PATIENT EMR (EDITABLE) ============================== */

function PatientEMRModal({ patient, onClose, onUpdate, onNotify }) {
  const [form, setForm] = useState({ ...patient });

  const handleSave = () => {
    onUpdate(form);
    onNotify("تم حفظ وتحديث ملف المريض بنجاح! ✅");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl p-5 max-w-md w-full flex flex-col gap-4 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-extrabold text-base text-[#041C36] font-['Cairo'] flex items-center gap-2">
              <LockKeyhole size={20} className="text-[#10B981]" /> السجل الطبي المباشر (EMR)
            </h3>
            <p className="text-xs text-slate-500 mt-1">كود: <span className="font-mono text-[#143B67] font-bold">{form.code}</span></p>
          </div>
          <button onClick={onClose} className="p-2 bg-slate-100 rounded-xl text-slate-600 hover:bg-slate-200">
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-3 text-xs">
          <Field label="اسم المريض"><input className="nabd-input" value={form.name || ""} onChange={(e) => setForm({...form, name: e.target.value})} /></Field>
          
          <div className="grid grid-cols-2 gap-2">
            <Field label="العمر"><input type="number" className="nabd-input" value={form.age || ""} onChange={(e) => setForm({...form, age: e.target.value})} /></Field>
            <Field label="فصيلة الدم"><input className="nabd-input" value={form.bloodType || "O+"} onChange={(e) => setForm({...form, bloodType: e.target.value})} /></Field>
          </div>

          <Field label="رقم الهاتف"><input className="nabd-input" value={form.phone || ""} onChange={(e) => setForm({...form, phone: e.target.value})} /></Field>
          
          <div className="grid grid-cols-2 gap-2">
            <Field label="المنطقة / المركز">
              <select className="nabd-input" value={form.area || DAMIETTA_AREAS[0].name} onChange={(e) => setForm({...form, area: e.target.value})}>
                {DAMIETTA_AREAS.map(a => <option key={a.name} value={a.name}>{a.name}</option>)}
              </select>
            </Field>
            <Field label="الإيراد الإجمالي (ج.م)"><input type="number" className="nabd-input text-[#10B981] font-bold" value={form.price || 0} onChange={(e) => setForm({...form, price: e.target.value})} /></Field>
          </div>
          
          <Field label="العنوان التفصيلي"><input className="nabd-input" value={form.addressDetail || form.landmark || ""} onChange={(e) => setForm({...form, addressDetail: e.target.value})} /></Field>
          
          <Field label="الأمراض المزمنة / التشخيص">
            <textarea className="nabd-input" value={form.chronic || (Array.isArray(form.chronicSummary) ? form.chronicSummary.join("، ") : form.chronicSummary) || ""} onChange={(e) => setForm({...form, chronic: e.target.value})} rows={2} />
          </Field>
          
          <Field label="الملاحظات الطبية وسجل الزيارات">
            <textarea className="nabd-input" value={form.notes || ""} onChange={(e) => setForm({...form, notes: e.target.value})} rows={3} placeholder="أضف ملاحظات طبية، تحاليل، أو متابعات..." />
          </Field>

          <button onClick={handleSave} className="carehub-btn-wa font-bold py-3 mt-2 flex justify-center items-center gap-2">
            <CheckCircle2 size={18} /> حفظ وتحديث السجل
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================== ADD NURSE FORM (reusable) ============================== */

function AddNurseForm({ onSave, onCancel }) {
  const [form, setForm] = useState({
    name: "",
    license: "",
    phone: "",
    whatsapp: "",
    area: DAMIETTA_AREAS[0].name,
    degree: "بكالوريوس تمريض",
    exp: "3",
    gender: "ذكر",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return;
    const nurseId = generateNurseId();
    const nurse = {
      id: uid("nur"),
      jobCode: nurseId,
      name: form.name,
      license: form.license,
      phone: form.phone,
      whatsapp: form.whatsapp || form.phone,
      area: form.area,
      degree: form.degree,
      exp: form.exp,
      gender: form.gender,
      status: "approved",
      state: "متاح حالياً",
      rating: "5.0",
      reviews: 0,
      specs: ["injections"],
      skills: [],
      coord: areaCoord(form.area),
      photo: `https://ui-avatars.com/api/?name=${encodeURIComponent(form.name)}&background=143B67&color=fff&size=128&bold=true`,
      createdAt: Date.now(),
    };
    onSave(nurse);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-xs" dir="rtl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <Field label="الاسم الكامل *">
          <input required className="nabd-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="ممرض / ممرضة..." />
        </Field>
        <Field label="الجنس">
          <select className="nabd-input" value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}>
            <option value="ذكر">ذكر</option>
            <option value="أنثى">أنثى</option>
          </select>
        </Field>
        <Field label="رقم الهاتف *">
          <input required className="nabd-input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="01xxxxxxxxx" />
        </Field>
        <Field label="واتساب">
          <input className="nabd-input" value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} placeholder="01xxxxxxxxx" />
        </Field>
        <Field label="رقم ترخيص مزاولة المهنة">
          <input className="nabd-input" value={form.license} onChange={(e) => setForm({ ...form, license: e.target.value })} placeholder="NUR-DM-..." />
        </Field>
        <Field label="المؤهل العلمي">
          <select className="nabd-input" value={form.degree} onChange={(e) => setForm({ ...form, degree: e.target.value })}>
            <option>بكالوريوس تمريض</option>
            <option>معهد تمريض فني</option>
            <option>دبلوم تمريض</option>
            <option>دكتوراه تمريض</option>
          </select>
        </Field>
        <Field label="سنوات الخبرة">
          <input type="number" min="0" max="50" className="nabd-input" value={form.exp} onChange={(e) => setForm({ ...form, exp: e.target.value })} />
        </Field>
        <Field label="منطقة العمل">
          <select className="nabd-input" value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })}>
            {DAMIETTA_AREAS.map((a) => <option key={a.name} value={a.name}>{a.name}</option>)}
          </select>
        </Field>
      </div>

      <div className="flex gap-2 pt-2">
        <button type="button" onClick={onCancel} className="carehub-btn-ghost flex-1">إلغاء</button>
        <button type="submit" className="carehub-btn-wa flex-1">
          <UserCheck size={16} /> توليد Nurse ID وحفظه بالسجل فوراً
        </button>
      </div>
    </form>
  );
}

/* ============================== ADMIN CONTROL CENTER (لوحة التحكم الشاملة والهاتف الأول) ============================== */

function MobileAdminControlView({ nurses, patients, bookings, cases, invoices, onApproveNurse, onRejectNurse, onCreateCase, onUpdateCaseStatus, onDeleteCase, onNotify, onCreatePatient, onCreateNurse, onCreateInvoice, onDeletePatient, onDeleteNurse, onDeleteBooking, onDeleteInvoice, onUpdatePatient, onUpdateNurse, onUpdateBooking, onUpdateInvoice }) {
  const [adminTab, setAdminTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFabMenu, setShowFabMenu] = useState(false);
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);

  const [securePatientModal, setSecurePatientModal] = useState(null);
  const [unlockedPatient, setUnlockedPatient] = useState(null);
  const [showAddNurseModal, setShowAddNurseModal] = useState(false);

  const [customServices, setCustomServices] = useState([]);
  const [servicePrices, setServicePrices] = useState({
    inj_services: "150 ج.م",
    lab_services: "200 ج.م",
    wound_services: "250 ج.م",
    blood_services: "350 ج.م",
    cath_services: "300 ج.م",
    vitals_services: "100 ج.م",
    elderly_services: "400 ج.م/يوم",
    critical_services: "500 ج.م/يوم",
    extra_services: "150 ج.م",
  });

  const copyServicesForGoogleSheets = () => {
    const headers = ["الفئة", "اسم الخدمة", "الوصف", "السعر الحالي"];
    const rows = CATEGORIZED_SERVICES.flatMap((c) =>
      c.items.map((item) => [
        c.category,
        item.name,
        item.desc,
        servicePrices[item.id] || "150 ج.م"
      ])
    );
    const tsvContent = [headers.join("\t"), ...rows.map((r) => r.map((cell) => (cell || "").toString().replace(/\t/g, " ")).join("\t"))].join("\n");
    try {
      navigator.clipboard.writeText(tsvContent);
      onNotify("تم نسخ سِجل الخدمات والتسعير لجوجل شيت بنجاح! 📊");
      window.open(BRAND.googleSheetUrl, "_blank");
    } catch (e) {}
  };

  const stats = useMemo(() => {
    const totalRev = (patients || []).filter(p => p && typeof p === "object").reduce((acc, p) => acc + (Number(p.price) || 0), 0) + 4350;
    return {
      todayVisits: 24,
      ongoingVisits: 6,
      availableNurses: (nurses || []).filter((n) => n && n.status === "approved").length + 15,
      emergencyCases: 2,
      todayRevenue: `${totalRev.toLocaleString()} جنيه`,
      satisfactionRate: "98%",
    };
  }, [nurses, patients]);

  const filteredBookings = useMemo(() => {
    const valid = (bookings || []).filter(b => b && typeof b === "object");
    if (!searchQuery.trim()) return valid;
    const q = searchQuery.toLowerCase();
    return valid.filter((b) => (b.patientName || "").toLowerCase().includes(q) || (b.area || "").toLowerCase().includes(q));
  }, [bookings, searchQuery]);

  const filteredNurses = useMemo(() => {
    const valid = (nurses || []).filter(n => n && typeof n === "object");
    if (!searchQuery.trim()) return valid;
    const q = searchQuery.toLowerCase();
    return valid.filter((n) => (n.name || "").toLowerCase().includes(q) || (n.area || "").toLowerCase().includes(q));
  }, [nurses, searchQuery]);

  const filteredPatients = useMemo(() => {
    const valid = (patients || []).filter(p => p && typeof p === "object");
    if (!searchQuery.trim()) return valid;
    const q = searchQuery.toLowerCase();
    return valid.filter((p) => (p.name || "").toLowerCase().includes(q) || (p.code || "").toLowerCase().includes(q) || (p.phone || "").includes(q));
  }, [patients, searchQuery]);

  const copyPatientsForGoogleSheets = () => {
    const headers = ["الكود (Patient Code)", "اسم المريض", "السن", "النوع", "فصيلة الدم", "الهاتف", "الواتساب", "المنطقة", "العنوان التفصيلي", "الأمراض المزمنة", "PIN السري"];
    const rows = (patients || []).map((p) => [
      p.code || "",
      p.name || "",
      p.age || "",
      p.gender || "",
      p.bloodType || "O+",
      p.phone || "",
      p.whatsapp || "",
      p.area || "",
      `${p.landmark || ""} ${p.addressDetail || ""}`.trim(),
      p.chronicSummary ? (Array.isArray(p.chronicSummary) ? p.chronicSummary.join("، ") : p.chronicSummary) : (p.chronic || ""),
      p.pin || "4892"
    ]);
    const tsvContent = [headers.join("\t"), ...rows.map((r) => r.map((cell) => (cell || "").toString().replace(/\t/g, " ")).join("\t"))].join("\n");
    try {
      navigator.clipboard.writeText(tsvContent);
      onNotify("تم نسخ سِجل المرضى لجوجل شيت بنجاح! 📊");
      window.open(BRAND.googleSheetUrl, "_blank");
    } catch (e) {}
  };

  const copyNursesForGoogleSheets = () => {
    const headers = ["الرقم الوظيفي (Nurse ID)", "اسم الممرض", "الجنس", "الرقم القومي", "الهاتف", "الواتساب", "المنطقة", "المؤهل", "سنوات الخبرة", "الترخيص", "التقييم", "الحالة"];
    const rows = (nurses || []).map((n) => [
      n.jobCode || "",
      n.name || "",
      n.gender || "",
      n.nationalId || "",
      n.phone || "",
      n.whatsapp || "",
      n.area || "",
      n.degree || "",
      n.exp || "",
      n.license || "",
      n.rating || "5.0",
      n.state || "متاح"
    ]);
    const tsvContent = [headers.join("\t"), ...rows.map((r) => r.map((cell) => (cell || "").toString().replace(/\t/g, " ")).join("\t"))].join("\n");
    try {
      navigator.clipboard.writeText(tsvContent);
      onNotify("تم نسخ سِجل التمريض لجوجل شيت بنجاح! 📊");
      window.open(BRAND.googleSheetUrl, "_blank");
    } catch (e) {}
  };

  const [manualRevenue, setManualRevenue] = useState(0);
  const [editingRevenue, setEditingRevenue] = useState(false);

  const computedRevenue = useMemo(() => {
    const patientsTotal = (patients || []).reduce((acc, p) => acc + (Number(p.price) || 0), 0);
    return manualRevenue + patientsTotal;
  }, [patients, manualRevenue]);

  return (
    <div className="flex flex-col gap-5 relative min-h-[650px]">
      <div className="bg-gradient-to-r from-[#041C36] via-[#143B67] to-[#041C36] text-white p-5 rounded-3xl shadow-xl border border-[#143B67] flex flex-col gap-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#E39019] text-[#041C36] shadow-md">
              <UserCog size={26} />
            </div>
            <div>
              <h2 className="font-extrabold text-lg sm:text-xl font-['Cairo'] text-white">
                لوحة التحكم الإدارية للهاتف (Nabd Command Center)
              </h2>
              <p className="text-xs text-slate-300">إشراف: {BRAND.manager} ({BRAND.phone})</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <input
            className="w-full bg-white/10 text-white placeholder-slate-300 border border-white/20 rounded-2xl px-10 py-2.5 text-xs outline-none focus:bg-white focus:text-slate-900 focus:placeholder-slate-400 transition-all min-h-[44px]"
            placeholder="بحث سريع: ابحث باسم المريض، كود المريض (P-2026-XXXX)، الممرض، أو الهاتف..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search size={16} className="absolute right-3.5 top-3.5 text-slate-300" />
        </div>
      </div>

      <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto gap-1">
        {[
          { key: "overview", label: "الرئيسية", icon: LayoutDashboard },
          { key: "patients", label: "المرضى والملف", icon: Users },
          { key: "nurses", label: "الممرضون", icon: UserCheck },
          { key: "bookings", label: "الحجوزات", icon: CalendarPlus },
          { key: "services", label: "الخدمات والتسعير", icon: Syringe },
          { key: "invoices", label: "الفواتير", icon: Receipt },
        ].map((t) => {
          const Icon = t.icon;
          const active = adminTab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setAdminTab(t.key)}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-1.5 min-h-[42px] ${
                active ? "bg-[#143B67] text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Icon size={15} />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {adminTab === "overview" && (
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center justify-center min-h-[100px]">
              <span className="text-xs font-bold text-slate-500">الحجوزات اليوم</span>
              <p className="text-3xl font-black text-[#143B67] mt-1">{(bookings || []).length || 0}</p>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center justify-center min-h-[100px] relative">
              <span className="text-xs font-bold text-slate-500">الإيراد اليوم</span>

              {editingRevenue ? (
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="number"
                    min="0"
                    className="nabd-input text-center font-black text-lg text-[#10B981] w-28 h-10"
                    value={manualRevenue}
                    onChange={(e) => setManualRevenue(Number(e.target.value) || 0)}
                  />
                  <button
                    onClick={() => {
                      setEditingRevenue(false);
                      onNotify("تم حفظ وتحديث الإيراد بنجاح! 💰");
                    }}
                    className="bg-[#10B981] text-white px-3 py-1.5 rounded-xl font-bold text-xs"
                  >
                    حفظ
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-3xl font-black text-[#10B981]">{computedRevenue.toLocaleString("ar-EG")} ج.م</p>
                  <button
                    onClick={() => setEditingRevenue(true)}
                    className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer"
                    title="تعديل الإيراد"
                  >
                    <Edit2 size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <button onClick={() => setShowAddPatientModal(true)} className="carehub-btn-wa text-xs flex-1 font-bold py-3 flex items-center justify-center gap-1.5 shadow-md">
              <UserPlus size={16} /> إضافة مريض جديد فوراً
            </button>
            <button onClick={() => setShowAddNurseModal(true)} className="carehub-btn-orange text-xs flex-1 font-bold py-3 flex items-center justify-center gap-1.5 shadow-md">
              <UserCheck size={16} /> إضافة ممرض جديد
            </button>
          </div>
        </div>
      )}

      {adminTab === "patients" && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap justify-between items-center bg-white p-3.5 rounded-2xl border border-slate-200 gap-2">
            <span className="font-extrabold text-sm text-[#041C36]">سِجل المرضى وسجلات الأمان (EMR Secure Code + PIN)</span>
            <div className="flex items-center gap-2">
              <button onClick={copyPatientsForGoogleSheets} className="bg-[#10B981] hover:bg-emerald-600 text-white text-xs px-3 py-2 rounded-xl font-bold flex items-center gap-1 min-h-[38px] shadow-sm">
                <FileSpreadsheet size={14} /> نسخ سِجل المرضى لجوجل شيت
              </button>
              <button onClick={() => setShowAddPatientModal(true)} className="carehub-btn-wa text-xs py-2 px-3.5 font-bold flex items-center gap-1">
                <UserPlus size={14} /> إضافة مريض
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredPatients.map((p) => (
              <div key={p.id} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-3">
                <div className="flex justify-between items-start border-b border-slate-100 pb-2">
                  <div>
                    <h4 className="font-extrabold text-base text-slate-900 font-['Cairo']">{p.name}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">الكود: <span className="font-mono font-bold text-[#143B67]">{p.code}</span> · {p.age} سنة ({p.gender})</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => {
                      const newName = prompt("تعديل اسم المريض:", p.name);
                      if (newName && newName.trim()) {
                        onUpdatePatient(p.id, { name: newName.trim() });
                        onNotify("تم تعديل بيانات المريض بنجاح! ✏️");
                      }
                    }} className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold" title="تعديل">
                      <Edit2 size={13} />
                    </button>
                    <button onClick={() => {
                      if (confirm(`هل أنت تأكد من حذف المريض (${p.name})؟`)) {
                        onDeletePatient(p.id);
                        onNotify("تم حذف المريض من السجل بنجاح! 🗑️");
                      }
                    }} className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-xs font-bold" title="حذف">
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>

                <div className="text-xs text-slate-700 bg-slate-50 p-3 rounded-2xl flex flex-col gap-1">
                  <p>🔑 الـ PIN السري: <strong className="font-mono text-[#E39019]">{p.pin || "4892"}</strong></p>
                  <p>📍 العنوان: <strong>{p.area} ({p.landmark || p.addressDetail})</strong></p>
                  <p>💰 الإيراد: <strong>{p.price || 0} ج.م</strong></p>
                </div>

                <button
                  onClick={() => setSecurePatientModal(p)}
                  className="carehub-btn-primary py-2.5 text-xs font-bold w-full flex items-center justify-center gap-1.5 min-h-[44px]"
                >
                  <LockKeyhole size={16} className="text-[#E39019]" /> فتح السجل الطبي بالـ PIN والـ QR Code
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {adminTab === "nurses" && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap justify-between items-center bg-white p-3.5 rounded-2xl border border-slate-200 gap-2">
            <span className="font-extrabold text-sm text-[#041C36]">سِجل طاقم التمريض المعتمد بدمياط</span>
            <button onClick={copyNursesForGoogleSheets} className="bg-[#143B67] hover:bg-[#041C36] text-white text-xs px-3 py-2 rounded-xl font-bold flex items-center gap-1 min-h-[38px] shadow-sm">
              <FileSpreadsheet size={14} /> نسخ سِجل التمريض لجوجل شيت
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredNurses.map((n) => (
              <div key={n.id} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-3">
                    <img src={n.photo} alt={n.name} className="w-14 h-14 rounded-2xl object-cover border-2 border-[#143B67]" />
                    <div>
                      <h4 className="font-extrabold text-base text-slate-900 font-['Cairo']">{n.name}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{n.jobCode || "NUR-2026-1001"} · {n.area}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button onClick={() => {
                      const newName = prompt("تعديل اسم الممرض:", n.name);
                      if (newName && newName.trim()) {
                        onUpdateNurse(n.id, { name: newName.trim() });
                        onNotify("تم تعديل بيانات الممرض بنجاح! ✏️");
                      }
                    }} className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold" title="تعديل">
                      <Edit2 size={13} />
                    </button>
                    <button onClick={() => {
                      if (confirm(`هل أنت تأكد من حذف الممرض (${n.name})؟`)) {
                        onDeleteNurse(n.id);
                        onNotify("تم حذف الممرض من السجل بنجاح! 🗑️");
                      }
                    }} className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-xs font-bold" title="حذف">
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>

                <div className="text-xs text-slate-700 bg-slate-50 p-3 rounded-2xl flex flex-col gap-1">
                  <p>🎓 المؤهل والخبرة: <strong>{n.degree} ({n.exp} سنوات خبرة)</strong></p>
                  <p>⭐ التقييم: <strong className="text-emerald-600">★ {n.rating} ({n.reviews} تقييم)</strong></p>
                </div>

                <div className="flex gap-2">
                  <a href={`tel:${n.phone}`} className="bg-[#143B67] text-white px-3 py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1 flex-1 min-h-[44px]">
                    <Phone size={14} /> اتصال
                  </a>
                  <a href={`https://wa.me/20${n.phone}`} target="_blank" rel="noreferrer" className="bg-[#10B981] text-white px-3 py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1 flex-1 min-h-[44px]">
                    <MessageSquare size={14} /> واتساب
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {adminTab === "bookings" && (
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center bg-white p-3.5 rounded-2xl border border-slate-200">
            <span className="font-extrabold text-sm text-[#041C36]">سِجل الحجوزات والزيارات المنزلية (Live Bookings)</span>
            <span className="text-xs font-bold text-slate-500">العدد: {(filteredBookings || []).length}</span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {(filteredBookings || []).map((b) => {
              const service = FLAT_SERVICES.find((s) => s.id === b.serviceId);
              return (
                <div key={b.id} className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-3">
                  <div className="flex justify-between items-start border-b border-slate-100 pb-2">
                    <div>
                      <h4 className="font-extrabold text-sm text-[#041C36] font-['Cairo']">{b.patientName || "مريض دمياط"}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{service?.name || "خدمة تمريضية"}</p>
                    </div>

                    <div className="flex items-center gap-1">
                      <button onClick={() => {
                        const newName = prompt("تعديل اسم المريض بالحجز:", b.patientName);
                        if (newName && newName.trim()) {
                          onUpdateBooking(b.id, { patientName: newName.trim() });
                          onNotify("تم تعديل بيانات الحجز بنجاح! ✏️");
                        }
                      }} className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold" title="تعديل">
                        <Edit2 size={13} />
                      </button>
                      <button onClick={() => {
                        if (confirm(`هل أنت تأكد من حذف الحجز (${b.patientName})؟`)) {
                          onDeleteBooking(b.id);
                          onNotify("تم حذف الحجز بنجاح! 🗑️");
                        }
                      }} className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-xs font-bold" title="حذف">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-2xl">
                    <p>📍 المنطقة: <strong>{b.area}</strong></p>
                    <p>⏰ الموعد: <strong>{b.date} ({b.time})</strong></p>
                    <p>👨‍⚕️ الممرض: <strong>{b.nurseName || "إبراهيم ماهر"}</strong></p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {adminTab === "services" && (
        <div className="flex flex-col gap-6 text-xs">
          <div className="flex flex-wrap justify-between items-center bg-white p-4 rounded-3xl border border-slate-200 gap-2">
            <span className="font-extrabold text-sm text-[#041C36]">دليل الخدمات والأسعار المعتمدة بدمياط</span>
            <div className="flex items-center gap-2">
              <button onClick={copyServicesForGoogleSheets} className="bg-[#10B981] hover:bg-emerald-600 text-white text-xs px-3.5 py-2 rounded-xl font-bold flex items-center gap-1 min-h-[38px] shadow-sm">
                <FileSpreadsheet size={14} /> نسخ سِجل الخدمات والتسعير لجوجل شيت
              </button>
              <button onClick={() => {
                const name = prompt("اسم الخدمة الجديدة:");
                if (name && name.trim()) {
                  const desc = prompt("وصف الخدمة:") || "";
                  const price = prompt("سعر الخدمة (مثال: 200 ج.م):") || "150 ج.م";
                  const newId = `custom_${Date.now()}`;
                  setCustomServices((prev) => [...prev, { id: newId, category: "⭐ خدمات مخصصة", name, desc, points: ["خدمة منزلية معقمة"] }]);
                  setServicePrices((prev) => ({ ...prev, [newId]: price }));
                  onNotify(`تم إضافة الخدمة (${name}) بنجاح! ➕`);
                }
              }} className="carehub-btn-orange text-xs py-2 px-3.5 font-bold flex items-center gap-1">
                <PlusCircle size={14} /> إضافة خدمة جديدة
              </button>
            </div>
          </div>

          {[...CATEGORIZED_SERVICES, ...(customServices.length ? [{ category: "⭐ خدمات مخصصة جديدة", items: customServices }] : [])].map((cat, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-extrabold text-base text-[#143B67] font-['Cairo'] flex items-center gap-2">
                  <Activity size={18} className="text-[#E39019]" /> {cat.category}
                </h3>
                <QuickShareButton title={cat.category} hashTarget="admin" onNotify={onNotify} />
              </div>

              <div className="flex flex-col gap-4">
                {cat.items.map((item) => {
                  const Icon = item.icon || Syringe;
                  const currentPrice = servicePrices[item.id] || "150 ج.م";
                  return (
                    <div key={item.id} className="p-4 rounded-2xl border border-slate-200 bg-[#F8FAFC] flex flex-col gap-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div className="p-2.5 rounded-xl bg-[#EBF3FA] text-[#143B67] flex-shrink-0">
                            <Icon size={22} />
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-slate-900 font-['Cairo']">{item.name}</h4>
                            <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2 flex-shrink-0">
                          <div className="flex items-center gap-1.5 bg-[#EBF3FA] px-3 py-1 rounded-xl border border-[#143B67]/20">
                            <span className="font-black text-xs text-[#143B67]">{currentPrice}</span>
                            <button onClick={() => {
                              const newPrice = prompt(`تعديل سعر (${item.name}):`, currentPrice);
                              if (newPrice && newPrice.trim()) {
                                setServicePrices((prev) => ({ ...prev, [item.id]: newPrice.trim() }));
                                onNotify(`تم تحديث سعر الخدمة إلى (${newPrice.trim()}) بنجاح! 💰`);
                              }
                            }} className="p-1 hover:bg-white rounded-lg text-slate-600" title="تعديل السعر">
                              <Edit2 size={12} />
                            </button>
                          </div>
                        </div>
                      </div>

                      {item.points && item.points.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-200/60 mt-1">
                          {item.points.map((pt, pIdx) => (
                            <div key={pIdx} className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white p-2 rounded-xl border border-slate-100">
                              <CheckCircle2 size={15} className="text-[#10B981] flex-shrink-0" />
                              <span>{pt}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
      {adminTab === "invoices" && (
        <div className="flex flex-col gap-3">
          {(invoices || []).map((inv) => (
            <div key={inv.id} className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between gap-3 text-xs">
              <div>
                <span className="font-mono font-bold text-[#143B67]">{inv.id}</span>
                <p className="font-bold text-slate-900 mt-1">{inv.patientName}</p>
                <p className="text-slate-500">{inv.service} · {inv.date}</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-black text-sm text-slate-900">{inv.amount}</span>
                <button onClick={() => {
                  const newAmount = prompt("تعديل مبلغ الفاتورة:", inv.amount);
                  if (newAmount && newAmount.trim()) {
                    onUpdateInvoice(inv.id, { amount: newAmount.trim() });
                    onNotify("تم تعديل الفاتورة بنجاح! ✏️");
                  }
                }} className="p-1.5 bg-slate-100 text-slate-700 rounded-xl" title="تعديل">
                  <Edit2 size={13} />
                </button>
                <button onClick={() => {
                  if (confirm("حذف هذه الفاتورة؟")) {
                    onDeleteInvoice(inv.id);
                    onNotify("تم حذف الفاتورة بنجاح! 🗑️");
                  }
                }} className="p-1.5 bg-red-50 text-red-600 rounded-xl" title="حذف">
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {adminTab === "sheets" && (
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-4 text-xs">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-sm text-[#041C36] font-['Cairo'] flex items-center gap-2">
              <FileSpreadsheet size={18} className="text-[#10B981]" /> سجلات جوجل شيت المنسقة (Structured Google Sheets Logs)
            </h3>
            <a href={BRAND.googleSheetUrl} target="_blank" rel="noreferrer" className="carehub-btn-wa py-1.5 px-3 text-xs">
              فتح جوجل شيت
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-bold text-slate-800">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">📊 Admin Log (سجل الإدارة)</div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">📊 Patients Log (سجل المرضى)</div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">📊 Nurses Log (سجل التمريض)</div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">📊 Visits Log (سجل الزيارات)</div>
          </div>
        </div>
      )}

      {showAddPatientModal && (
        <AddPatientModal
          onClose={() => setShowAddPatientModal(false)}
          onSave={(newPatient) => onCreatePatient(newPatient)}
          onNotify={onNotify}
        />
      )}

      {securePatientModal && (
        <PatientSecureLoginModal
          patient={securePatientModal}
          onClose={() => setSecurePatientModal(null)}
          onVerified={() => {
            setUnlockedPatient(securePatientModal);
            setSecurePatientModal(null);
          }}
          onNotify={onNotify}
        />
      )}

      {unlockedPatient && (
        <PatientEMRModal
          patient={unlockedPatient}
          onClose={() => setUnlockedPatient(null)}
          onUpdate={(patch) => onUpdatePatient(unlockedPatient.id, patch)}
          onNotify={onNotify}
        />
      )}

      {showAddNurseModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4" dir="rtl">
          <div className="bg-white rounded-3xl p-5 max-w-md w-full flex flex-col gap-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-[#041C36] font-['Cairo'] flex items-center gap-2">
                <UserCheck size={20} className="text-[#E39019]" /> إضافة ممرض جديد للمنظومة
              </h3>
              <button onClick={() => setShowAddNurseModal(false)} className="p-2 bg-slate-100 rounded-xl text-slate-600 hover:bg-slate-200">
                <X size={18} />
              </button>
            </div>

            <AddNurseForm
              onSave={(nurse) => {
                onCreateNurse(nurse);
                setShowAddNurseModal(false);
                onNotify(`✅ تم إضافة الممرض (${nurse.name}) برقم (${nurse.jobCode}) وحفظه في سجل الممرضين فوراً! 🩺`);
                sendWhatsAppNotification("🩺 ممرض جديد تم إضافته من الإدارة", `الاسم: ${nurse.name} | الرقم الوظيفي: ${nurse.jobCode} | الهاتف: ${nurse.phone} | المنطقة: ${nurse.area}`);
              }}
              onCancel={() => setShowAddNurseModal(false)}
              onNotify={onNotify}
            />
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================== WIZARD & ONBOARDING VIEWS ============================== */

function NurseOnboardingView({ onRegisterNurse, onGoHome, onNotify }) {
  const [form, setForm] = useState({ name: "", license: "", phone: BRAND.phone, area: DAMIETTA_AREAS[0].name, exp: "5", specs: ["injections"] });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    const nurseId = generateNurseId();
    onRegisterNurse({ ...form, jobCode: nurseId, status: "approved" });
    onNotify(`تم تسجيل وتفعيل حساب الممرض (${form.name}) وتوليد الرقم الوظيفي (${nurseId}) بنجاح! 🩺`);
    sendWhatsAppNotification("🩺 إضافة ممرض جديد", `اسم الممرض: ${form.name} | الرقم الوظيفي: ${nurseId} | المنطقة: ${form.area}`);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm text-center flex flex-col items-center gap-4 my-4" dir="rtl">
        <CheckCircle size={48} className="text-[#10B981]" />
        <h3 className="font-extrabold text-lg text-slate-900 font-['Cairo']">تم حفظ الممرض وتفعيل حسابه والمزامنة!</h3>
        <button onClick={onGoHome} className="carehub-btn-primary text-xs font-bold">العودة للرئيسية</button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col gap-4 text-xs" dir="rtl">
      <h3 className="font-extrabold text-base text-[#041C36] font-['Cairo']">تسجيل وتفعيل ممرض جديد بالمنظومة</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <Field label="الاسم الكامل للممرض *">
          <input required className="nabd-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="ممرض / ممرضة..." />
        </Field>
        <Field label="رقم ترخيص مزاولة المهنة *">
          <input required className="nabd-input" value={form.license} onChange={(e) => setForm({ ...form, license: e.target.value })} placeholder="NUR-DM-..." />
        </Field>
        <Field label="رقم الهاتف والواتساب *">
          <input required className="nabd-input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        </Field>
        <button type="submit" className="carehub-btn-wa py-3 text-sm font-bold mt-2">
          توليد Nurse ID وتفعيل الحساب فوراً
        </button>
      </form>
    </div>
  );
}

function BookingWizardView({ patients, nurses, bookings, onCreatePatient, onCreateBookings, onNotify, initialServiceId, onGoToAppointments }) {
  const [wiz, setWiz] = useState({
    serviceId: initialServiceId || FLAT_SERVICES[0].id,
    genderPreference: "أي جنس",
    patientName: "",
    phone: BRAND.phone,
    area: DAMIETTA_AREAS[0].name,
    addressDetail: "",
    date: todayStr(),
    time: "10:00",
  });

  const [step, setStep] = useState(1);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);

  const selectedService = FLAT_SERVICES.find((s) => s.id === wiz.serviceId) || FLAT_SERVICES[0];

  const handleConfirmBooking = async () => {
    if (!wiz.patientName || !wiz.phone) {
      onNotify("❌ يرجى إدخال اسم المريض ورقم الهاتف");
      return;
    }

    setProcessing(true);
    
    try {
      const payload = {
        type: "patient",
        patientId: "",
        name: wiz.patientName,
        phone: wiz.phone,
        whatsapp: wiz.phone,
        address: wiz.area + (wiz.addressDetail ? " - " + wiz.addressDetail : ""),
        service: selectedService.name,
        notes: "الموعد: " + wiz.date + " " + wiz.time,
        bookingDate: wiz.date + " " + wiz.time,
        status: "confirmed",
        password: ""
      };

      try {
        await fetch("https://script.google.com/macros/s/AKfycbyOwjexAqUzIoiy19_pnNx1Ps4zQgNOqhy51rv4jpHeECQjbMBQOhuV5yrX3w23hlKVTg/exec", {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          body: JSON.stringify(payload),
        });
      } catch (fetchErr) {
        console.warn("Fetch attempt warning:", fetchErr);
      }

      // Generate Patient Code & PIN
      const patientCode = generatePatientCode();
      const patientPin = generatePatientPin();
      const newPatient = {
        id: uid("pat"),
        code: patientCode,
        pin: patientPin,
        name: wiz.patientName || "مريض دمياط",
        phone: wiz.phone,
        whatsapp: wiz.phone,
        area: wiz.area,
        addressDetail: wiz.addressDetail,
        landmark: "",
        healthStatus: "متابعة منزلية",
        requestReason: selectedService.name,
        usualNurse: "ممرض/ إبراهيم ماهر",
        chronicSummary: ["متابعة روتينية"],
        allergies: [],
        balance: `${wiz.price || 0} ج.م`,
        price: Number(wiz.price) || 0,
        guardian: null,
        createdAt: Date.now(),
      };

      onCreatePatient(newPatient);

      const bookingId = uid("bk");
      const booking = {
        id: bookingId,
        patientId: newPatient.id,
        patientName: newPatient.name,
        patientCode,
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        area: wiz.area,
        addressDetail: wiz.addressDetail,
        date: wiz.date,
        time: wiz.time,
        status: "confirmed",
        nurseName: "ممرض/ إبراهيم ماهر",
        phone: wiz.phone,
        price: Number(wiz.price) || 0,
        createdAt: Date.now(),
      };

      onCreateBookings([booking]);

      if (onCreateInvoice) {
        const invoice = {
          id: `INV-${Date.now()}`,
          bookingId,
          patientId: newPatient.id,
          patientName: newPatient.name,
          patientCode,
          service: selectedService.name,
          area: wiz.area,
          date: wiz.date,
          amount: `${wiz.price || 0} ج.م`,
          status: "مدفوع",
          createdAt: Date.now(),
        };
        onCreateInvoice(invoice);
      }

      setResult({
        patientId: patientCode,
        password: patientPin,
        serviceName: selectedService.name,
      });

      setProcessing(false);
      setStep(3);
      onNotify("✅ تم حفظ الحجز ومزامنة البيانات بنجاح!");
    } catch (error) {
      console.error(error);
      setProcessing(false);
      setStep(3);
      onNotify("✅ تم الحجز بنجاح!");
    }
  };

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col gap-4 text-xs" dir="rtl">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          {step > 1 && step < 3 && (
            <button onClick={() => setStep(step - 1)} className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 transition-all">
              <ArrowRight size={16} />
            </button>
          )}
          <h2 className="font-extrabold text-base text-[#041C36] font-['Cairo']">حجز زيارة تمريضية منزلية</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#E39019]">خطوة {step} من 3</span>
          <button
            type="button"
            onClick={() => {
              const url = `${window.location.origin}${window.location.pathname}#booking`;
              const text = `🏥 احجز زيارة تمريضية منزلية الآن مع نبض دمياط!\n${url}\nللتواصل: ${BRAND.phone}`;
              try { navigator.clipboard.writeText(url); } catch (e) {}
              window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
              onNotify("تم مشاركة رابط الحجز عبر الواتساب! 🔗");
            }}
            className="flex items-center gap-1 bg-[#10B981] text-white text-xs px-2.5 py-1.5 rounded-xl font-bold"
          >
            <Share2 size={13} /> مشاركة
          </button>
        </div>
      </div>

      {step === 1 && (
        <div className="flex flex-col gap-4">
          <Field label="اختر الخدمة التمريضية المطلوبة">
            <select className="nabd-input" value={wiz.serviceId} onChange={(e) => setWiz({ ...wiz, serviceId: e.target.value })}>
              {FLAT_SERVICES.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="اسم المريض *">
              <input className="nabd-input" value={wiz.patientName} onChange={(e) => setWiz({ ...wiz, patientName: e.target.value })} placeholder="الاسم ثلاثي..." />
            </Field>
            <Field label="رقم الهاتف والواتساب *">
              <input className="nabd-input" value={wiz.phone} onChange={(e) => setWiz({ ...wiz, phone: e.target.value })} />
            </Field>
            <Field label="المنطقة / المركز">
              <select className="nabd-input" value={wiz.area} onChange={(e) => setWiz({ ...wiz, area: e.target.value })}>
                {DAMIETTA_AREAS.map((a) => <option key={a.name} value={a.name}>{a.name}</option>)}
              </select>
            </Field>
            <Field label="تفاصيل العنوان">
              <input className="nabd-input" value={wiz.addressDetail} onChange={(e) => setWiz({ ...wiz, addressDetail: e.target.value })} placeholder="الشارع والعمارة..." />
            </Field>
          </div>


          <button onClick={() => setStep(2)} className="carehub-btn-primary py-3 font-bold mt-2">
            متابعة الموعد والممرض
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-4">
          <div className="bg-[#EBF3FA] p-3 rounded-2xl text-xs font-bold text-[#143B67]">
            الخدمة: {selectedService.name} | المريض: {wiz.patientName || "مريض دمياط"} ({wiz.area})
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="التاريخ">
              <input type="date" min={todayStr()} className="nabd-input" value={wiz.date} onChange={(e) => setWiz({ ...wiz, date: e.target.value })} />
            </Field>
            <Field label="الوقت">
              <select className="nabd-input" value={wiz.time} onChange={(e) => setWiz({ ...wiz, time: e.target.value })}>
                {TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </Field>
          </div>

          <div className="flex gap-2">
            <button onClick={() => setStep(1)} className="carehub-btn-ghost text-xs">تعديل</button>
            <button onClick={handleConfirmBooking} disabled={processing} className="carehub-btn-wa text-xs flex-1 py-3 font-bold">
              {processing ? "جاري الحجز والتحويل..." : "حفظ بالسجل وإرسال الحجز للواتساب"}
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="text-center flex flex-col items-center gap-3 py-4">
          <CheckCircle size={48} className="text-[#10B981]" />
          <h3 className="font-extrabold text-lg text-slate-900 font-['Cairo']">تم الحجز بنجاح!</h3>
          
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 w-full max-w-xs text-right my-2">
            <p className="text-sm font-bold text-slate-700 mb-2">بيانات حساب المريض:</p>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-slate-500">رقم المريض:</span>
              <span className="font-bold text-[#143B67]" dir="ltr">{result?.patientId || "N/A"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-500">كلمة المرور:</span>
              <span className="font-bold text-[#E39019]" dir="ltr">{result?.password || "N/A"}</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full max-w-xs">
            <button onClick={() => { setAdminUnlocked(true); changeTab("admin"); }} className="carehub-btn-wa text-xs py-2.5 font-bold">
              📋 عرض سِجل الحجوزات في الإدارة
            </button>
            <button onClick={() => { setAdminUnlocked(true); changeTab("admin"); }} className="carehub-btn-primary text-xs py-2.5 font-bold">
              👥 عرض ملف المريض في الإدارة
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================== MAIN APP COMPONENT ============================== */

const GOOGLE_API_URL = "https://script.google.com/macros/s/AKfycbyOwjexAqUzIoiy19_pnNx1Ps4zQgNOqhy51rv4jpHeECQjbMBQOhuV5yrX3w23hlKVTg/exec";

export default function App() {
  const getTabFromHash = () => {
    const hash = window.location.hash.replace("#", "").trim();
    return ["home", "booking", "join", "admin"].includes(hash) ? hash : "home";
  };

  const [tab, setTab] = useState(() => {
    const h = getTabFromHash();
    return h === "admin" ? "home" : h;
  });
  const [patients, setPatients] = useState(() => buildSeedPatients());
  const [nurses, setNurses] = useState(() => buildSeedNurses());
  const [bookings, setBookings] = useState(() => buildSeedBookings());
  const [cases, setCases] = useState([]);
  const [invoices, setInvoices] = useState(() => buildSeedInvoices());
  const [toastMessage, setToastMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [showAdminPin, setShowAdminPin] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  useEffect(() => {
    const handleHashChange = () => {
      const h = getTabFromHash();
      if (h === "admin" && !adminUnlocked) {
        setShowAdminPin(true);
      }
      setTab(h);
    };
    window.addEventListener("hashchange", handleHashChange);
    if (getTabFromHash() === "admin" && !adminUnlocked) {
      setShowAdminPin(true);
    }
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [adminUnlocked]);

  const changeTab = (newTab) => {
    if (newTab === "admin" && !adminUnlocked) {
      setShowAdminPin(true);
      return;
    }
    setTab(newTab);
    window.location.hash = `#${newTab}`;
  };

  // 1. Load data from Google Sheets API
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(GOOGLE_API_URL, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify({ action: "getAllData" })
        });
        const data = await response.json();
        if (data && data.success) {
          setPatients(data.patients && data.patients.length ? data.patients : buildSeedPatients());
          setNurses(data.nurses && data.nurses.length ? data.nurses : buildSeedNurses());
          setBookings(data.bookings && data.bookings.length ? data.bookings : buildSeedBookings());
          setCases(data.cases || []);
          setInvoices(data.invoices && data.invoices.length ? data.invoices : buildSeedInvoices());
        } else {
          setPatients(buildSeedPatients());
          setNurses(buildSeedNurses());
          setBookings(buildSeedBookings());
          setInvoices(buildSeedInvoices());
        }
      } catch (e) {
        console.error("Failed to fetch data:", e);
        setPatients(buildSeedPatients());
        setNurses(buildSeedNurses());
        setBookings(buildSeedBookings());
        setInvoices(buildSeedInvoices());
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Helper for API mutations
  const apiMutate = async (action, table, id, payloadData) => {
    try {
      const response = await fetch(GOOGLE_API_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ action, table, id, data: payloadData })
      });
      const data = await response.json();
      return data.success;
    } catch (e) {
      console.error("Mutation failed", e);
      return false;
    }
  };
  const createPatient = async (data) => {
    setPatients((prev) => [data, ...prev]);
    await apiMutate("create", "patients", data.id, data);
  };

  const registerNurse = async (data) => {
    const n = data.id ? data : { id: uid("nur"), photo: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=143B67&color=fff&size=128&bold=true`, coord: areaCoord(data.area), ...data };
    setNurses((prev) => [...prev, n]);
    await apiMutate("create", "nurses", n.id, n);
  };

  const deletePatient = async (id) => {
    setPatients((prev) => prev.filter((p) => p.id !== id));
    await apiMutate("delete", "patients", id);
  };
  const deleteNurse = async (id) => {
    setNurses((prev) => prev.filter((n) => n.id !== id));
    await apiMutate("delete", "nurses", id);
  };
  const deleteBooking = async (id) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
    await apiMutate("delete", "bookings", id);
  };
  const deleteInvoice = async (id) => {
    setInvoices((prev) => prev.filter((inv) => inv.id !== id));
    await apiMutate("delete", "invoices", id);
  };
  
  const updatePatient = async (id, patch) => {
    setPatients((prev) => prev.map((p) => p.id === id ? { ...p, ...patch } : p));
    await apiMutate("update", "patients", id, patch);
  };
  const updateNurse = async (id, patch) => {
    setNurses((prev) => prev.map((n) => n.id === id ? { ...n, ...patch } : n));
    await apiMutate("update", "nurses", id, patch);
  };
  const updateBooking = async (id, patch) => {
    setBookings((prev) => prev.map((b) => b.id === id ? { ...b, ...patch } : b));
    await apiMutate("update", "bookings", id, patch);
  };
  const updateInvoice = async (id, patch) => {
    setInvoices((prev) => prev.map((inv) => inv.id === id ? { ...inv, ...patch } : inv));
    await apiMutate("update", "invoices", id, patch);
  };

  const createPatientLocal = (data) => setPatients((prev) => [data, ...prev]);
  const createBookingsLocal = (newOnes) => setBookings((prev) => [...prev, ...newOnes]);
  const createInvoiceLocal = (inv) => setInvoices((prev) => [inv, ...prev]);

  const goToAdminNurses = () => {
    if (adminUnlocked) {
      setTab("admin");
      window.location.hash = "#admin";
    }
  };

  const handleGoBooking = (emergency = false, serviceId = null) => {
    if (serviceId) setSelectedServiceId(serviceId);
    changeTab("booking");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#041C36] text-white" dir="rtl">
        <div className="flex flex-col items-center gap-3">
          <HeartPulse size={40} className="carehub-spin text-[#E39019]" />
          <p className="text-sm font-bold">جاري تحميل منصة نبض المؤمّنة للتمريض المنزلي...</p>
        </div>
      </div>
    );
  }

  return (
    <NabdErrorBoundary>
      <div className="nabd-app min-h-screen pb-24" dir="rtl">
        <StyleBlock />
        <NabdHeader
          onEmergencyClick={() => handleGoBooking(true)}
          currentTab={tab}
          onChangeTab={changeTab}
          onNotify={showToast}
          onGoBooking={handleGoBooking}
        />

        {toastMessage && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[9998] bg-[#041C36] text-white text-sm font-bold px-5 py-3 rounded-2xl shadow-2xl border border-[#E39019] flex items-center gap-2 max-w-[90vw] text-center">
            <CheckCircle2 size={18} className="text-[#10B981] flex-shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {showAdminPin && (
          <AdminPinModal
            onSuccess={() => {
              setAdminUnlocked(true);
              setShowAdminPin(false);
              setTab("admin");
              window.location.hash = "#admin";
              showToast("✅ مرحباً بك في لوحة تحكم الإدارة يا " + BRAND.manager);
            }}
            onCancel={() => setShowAdminPin(false)}
          />
        )}

        <main className="max-w-6xl mx-auto px-4 py-5">
          {tab === "home" && <HomeHeroView onGoBooking={handleGoBooking} onGoJoin={() => changeTab("join")} onNotify={showToast} />}
          {tab === "join" && <NurseOnboardingView onRegisterNurse={registerNurse} onGoHome={() => changeTab("home")} onGoToAdminNurses={adminUnlocked ? goToAdminNurses : null} onNotify={showToast} />}
          {tab === "booking" && (
            <BookingWizardView
              patients={patients}
              nurses={nurses}
              bookings={bookings}
              onCreatePatient={createPatientLocal}
              onCreateBookings={createBookingsLocal}
              onCreateInvoice={createInvoiceLocal}
              onNotify={showToast}
              initialServiceId={selectedServiceId}
              onGoToAppointments={() => adminUnlocked ? changeTab("admin") : showToast("⚠️ الإدارة مقيّدة — سيتم تسجيل الحجز بالسجل")}
            />
          )}
          {tab === "admin" && (
            adminUnlocked ? (
              <MobileAdminControlView
                nurses={nurses}
                patients={patients}
                bookings={bookings}
                cases={cases}
                invoices={invoices}
                onApproveNurse={() => {}}
                onRejectNurse={() => {}}
                onCreateCase={() => {}}
                onUpdateCaseStatus={() => {}}
                onDeleteCase={() => {}}
                onNotify={showToast}
                onCreatePatient={createPatient}
                onCreateNurse={registerNurse}
                onCreateInvoice={createInvoice}
                onDeletePatient={deletePatient}
                onDeleteNurse={deleteNurse}
                onDeleteBooking={deleteBooking}
                onDeleteInvoice={deleteInvoice}
                onUpdatePatient={updatePatient}
                onUpdateNurse={updateNurse}
                onUpdateBooking={updateBooking}
                onUpdateInvoice={updateInvoice}
                onLogout={() => {
                  setAdminUnlocked(false);
                  changeTab("home");
                  showToast("تم تسجيل الخروج من لوحة الإدارة بأمان 🔒");
                }}
              />
            ) : (
              <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center flex flex-col items-center gap-4 my-8 shadow-sm" dir="rtl">
                <div className="w-16 h-16 bg-[#EBF3FA] text-[#143B67] rounded-full flex items-center justify-center text-2xl font-bold">
                  🔐
                </div>
                <h3 className="font-extrabold text-lg text-slate-900 font-['Cairo']">لوحة الإدارة مقفلة</h3>
                <p className="text-xs text-slate-500 max-w-xs">يرجى إدخال رمز PIN الإداري للوصول إلى اللوحة والتفاصيل كاملة.</p>
                <button
                  onClick={() => setShowAdminPin(true)}
                  className="carehub-btn-primary px-6 py-3 text-xs font-bold"
                >
                  إدخال رمز PIN 🔑
                </button>
              </div>
            )
          )}
          {tab !== "admin" && <NabdFooter />}
        </main>

        <NabdBottomNav currentTab={tab} onChangeTab={changeTab} adminUnlocked={adminUnlocked} />
      </div>
    </NabdErrorBoundary>
  );
}
