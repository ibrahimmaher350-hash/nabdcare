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

/* ============================== PROFESSIONAL ADMIN DASHBOARD ============================== */

// Activity Log Hook
function useActivityLog() {
  const [log, setLog] = React.useState(() => {
    try { const s = localStorage.getItem("nabd_activity_log"); return s ? JSON.parse(s) : []; } catch { return []; }
  });
  const addLog = React.useCallback((type, userName, phone, details, executor, status) => {
    const entry = {
      id: "ACT-" + Date.now(), type,
      userName: userName || "غير محدد",
      phone: phone || "—",
      details: details || "—",
      executor: executor || "الإدارة",
      status: status || "مكتمل",
      date: new Date().toLocaleDateString("ar-EG"),
      time: new Date().toLocaleTimeString("ar-EG"),
      ts: Date.now(),
    };
    setLog(prev => {
      const updated = [entry, ...prev].slice(0, 500);
      try { localStorage.setItem("nabd_activity_log", JSON.stringify(updated)); } catch {}
      return updated;
    });
  }, []);
  return [log, addLog];
}

const fmtCurrency = (n) => Number(n || 0).toLocaleString("ar-EG") + " ج.م";
const todayDate = () => new Date().toLocaleDateString("ar-EG");
const weekAgo = () => { const d = new Date(); d.setDate(d.getDate() - 7); return d; };
const monthAgo = () => { const d = new Date(); d.setDate(d.getDate() - 30); return d; };

function AdminModal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center p-4 overflow-y-auto" dir="rtl">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-[#041C36] to-[#143B67] text-white p-5 rounded-t-3xl flex items-center justify-between">
          <h3 className="font-extrabold text-base font-['Cairo']">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-xl transition-all"><X size={18}/></button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

function KpiCard({ label, value, icon, color, bg }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex items-center gap-3">
      <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: bg || "#EBF3FA" }}>
        <span className="text-xl">{icon}</span>
      </div>
      <div className="min-w-0">
        <p className="text-[10px] text-slate-500 font-bold truncate">{label}</p>
        <p className="font-extrabold text-lg leading-tight" style={{ color: color || "#143B67" }}>{value}</p>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    confirmed: { label: "مؤكد", cls: "bg-emerald-100 text-emerald-700" },
    pending: { label: "معلق", cls: "bg-amber-100 text-amber-700" },
    completed: { label: "مكتمل", cls: "bg-blue-100 text-blue-700" },
    cancelled: { label: "ملغي", cls: "bg-red-100 text-red-600" },
    paid: { label: "مدفوع", cls: "bg-emerald-100 text-emerald-700" },
    approved: { label: "معتمد", cls: "bg-emerald-100 text-emerald-700" },
    active: { label: "نشط", cls: "bg-blue-100 text-blue-700" },
    مكتمل: { label: "مكتمل", cls: "bg-blue-100 text-blue-700" },
    مدفوع: { label: "مدفوع", cls: "bg-emerald-100 text-emerald-700" },
    "متابعة منزلية": { label: "متابعة", cls: "bg-sky-100 text-sky-700" },
  };
  const s = map[status] || { label: status || "—", cls: "bg-slate-100 text-slate-600" };
  return <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${s.cls}`}>{s.label}</span>;
}

function AddPatientFullModal({ onClose, onSave, onNotify }) {
  const [f, setF] = React.useState({
    name: "", phone: "", whatsapp: "", age: "", gender: "ذكر", area: "مركز وبندر دمياط",
    addressDetail: "", landmark: "", bloodType: "O+", chronic: "", allergies: "", medications: "",
    notes: "", healthStatus: "متابعة منزلية", requestReason: "",
  });
  const set = (k, v) => setF(p => ({ ...p, [k]: v }));
  const handleSave = () => {
    if (!f.name || !f.phone) { onNotify("❌ يرجى إدخال الاسم والهاتف"); return; }
    const code = generatePatientCode();
    const pin = generatePatientPin();
    onSave({
      id: uid("pat"), code, pin,
      name: f.name, phone: f.phone, whatsapp: f.whatsapp || f.phone,
      age: f.age, gender: f.gender, area: f.area, addressDetail: f.addressDetail,
      landmark: f.landmark, bloodType: f.bloodType,
      chronicSummary: f.chronic ? f.chronic.split("،").map(s => s.trim()) : [],
      allergies: f.allergies ? f.allergies.split("،").map(s => s.trim()) : [],
      medications: f.medications, notes: f.notes,
      healthStatus: f.healthStatus, requestReason: f.requestReason,
      price: 0, balance: "0 ج.م", guardian: null, createdAt: Date.now(),
    });
    onClose();
  };
  return (
    <AdminModal title="➕ إضافة مريض جديد" onClose={onClose}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        {[["name","الاسم الكامل *","text","اسم المريض"],["phone","رقم الهاتف *","text","01XXXXXXXXX"],["whatsapp","واتساب","text","01XXXXXXXXX"],["age","العمر","number","السن"]].map(([k,l,t,pl]) => (
          <div key={k} className="flex flex-col gap-1">
            <label className="font-bold text-slate-700">{l}</label>
            <input className="nabd-input text-xs" type={t} value={f[k]} onChange={e => set(k, e.target.value)} placeholder={pl} />
          </div>
        ))}
        <div className="flex flex-col gap-1"><label className="font-bold text-slate-700">الجنس</label>
          <select className="nabd-input text-xs" value={f.gender} onChange={e => set("gender", e.target.value)}><option>ذكر</option><option>أنثى</option></select>
        </div>
        <div className="flex flex-col gap-1"><label className="font-bold text-slate-700">فصيلة الدم</label>
          <select className="nabd-input text-xs" value={f.bloodType} onChange={e => set("bloodType", e.target.value)}>
            {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map(b => <option key={b}>{b}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1"><label className="font-bold text-slate-700">المنطقة</label>
          <select className="nabd-input text-xs" value={f.area} onChange={e => set("area", e.target.value)}>
            {["مركز وبندر دمياط","دمياط الجديدة","كفر سعد","فارسكور","الزرقا","عزبة البرج","ميت أبو غالب","السرو"].map(a => <option key={a}>{a}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1"><label className="font-bold text-slate-700">حالة المريض</label>
          <select className="nabd-input text-xs" value={f.healthStatus} onChange={e => set("healthStatus", e.target.value)}>
            {["متابعة منزلية","حرج","تحسن","مستقر"].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        {[["addressDetail","العنوان التفصيلي","الشارع والعمارة..."],["landmark","علامة مميزة","أمام مسجد..."],["requestReason","الخدمة المطلوبة","تمريض / حقن..."],["chronic","أمراض مزمنة (فصّل بـ ،)","سكر، ضغط..."],["allergies","الحساسية","بنسلين..."],["medications","الأدوية الحالية","أسماء الأدوية..."]].map(([k,l,pl]) => (
          <div key={k} className="flex flex-col gap-1"><label className="font-bold text-slate-700">{l}</label>
            <input className="nabd-input text-xs" value={f[k]} onChange={e => set(k, e.target.value)} placeholder={pl} />
          </div>
        ))}
        <div className="sm:col-span-2 flex flex-col gap-1"><label className="font-bold text-slate-700">ملاحظات إضافية</label>
          <textarea className="nabd-input text-xs resize-none h-16" value={f.notes} onChange={e => set("notes", e.target.value)} placeholder="أي ملاحظات طبية..." />
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <button onClick={onClose} className="carehub-btn-ghost flex-1 text-xs">إلغاء</button>
        <button onClick={handleSave} className="carehub-btn-primary flex-1 text-xs font-bold">💾 حفظ المريض</button>
      </div>
    </AdminModal>
  );
}

function AddRevenueModal({ patients, onClose, onSave, onNotify }) {
  const [f, setF] = React.useState({ patientId: "", patientName: "", service: "", amount: "", discount: "0", paid: "", remaining: "0", method: "كاش", date: new Date().toISOString().slice(0, 10), notes: "" });
  const setVal = (k, v) => setF(p => {
    const u = { ...p, [k]: v };
    if (k === "amount" || k === "discount" || k === "paid") {
      u.remaining = String(Math.max(0, (Number(u.amount)||0) - (Number(u.discount)||0) - (Number(u.paid)||0)));
    }
    return u;
  });
  const handleSave = () => {
    if (!f.service || !f.amount) { onNotify("❌ يرجى إدخال الخدمة والمبلغ"); return; }
    onSave({ id: "REV-" + Date.now(), ...f, amount: Number(f.amount), discount: Number(f.discount), paid: Number(f.paid), remaining: Number(f.remaining), createdAt: Date.now() });
    onClose();
  };
  return (
    <AdminModal title="💰 تسجيل إيراد جديد" onClose={onClose}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="sm:col-span-2 flex flex-col gap-1"><label className="font-bold text-slate-700">المريض</label>
          <select className="nabd-input text-xs" value={f.patientId} onChange={e => {
            const pt = (patients||[]).find(p => p.id === e.target.value);
            setF(prev => ({ ...prev, patientId: e.target.value, patientName: pt ? pt.name : "" }));
          }}>
            <option value="">-- اختر المريض --</option>
            {(patients||[]).map(p => <option key={p.id} value={p.id}>{p.name} ({p.code})</option>)}
          </select>
        </div>
        <div className="sm:col-span-2 flex flex-col gap-1"><label className="font-bold text-slate-700">الخدمة *</label>
          <input className="nabd-input text-xs" value={f.service} onChange={e => setVal("service", e.target.value)} placeholder="اسم الخدمة" />
        </div>
        {[["amount","قيمة الخدمة *"],["discount","الخصم"],["paid","المبلغ المدفوع"]].map(([k,l]) => (
          <div key={k} className="flex flex-col gap-1"><label className="font-bold text-slate-700">{l}</label>
            <input className="nabd-input text-xs" type="number" value={f[k]} onChange={e => setVal(k, e.target.value)} placeholder="0" />
          </div>
        ))}
        <div className="flex flex-col gap-1"><label className="font-bold text-slate-700">المتبقي</label>
          <input className="nabd-input text-xs bg-slate-50" readOnly value={fmtCurrency(f.remaining)} />
        </div>
        <div className="flex flex-col gap-1"><label className="font-bold text-slate-700">طريقة الدفع</label>
          <select className="nabd-input text-xs" value={f.method} onChange={e => setVal("method", e.target.value)}>
            {["كاش","تحويل بنكي","فودافون كاش","انستاباي","آجل"].map(m => <option key={m}>{m}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1"><label className="font-bold text-slate-700">تاريخ الدفع</label>
          <input className="nabd-input text-xs" type="date" value={f.date} onChange={e => setVal("date", e.target.value)} />
        </div>
        <div className="sm:col-span-2 flex flex-col gap-1"><label className="font-bold text-slate-700">ملاحظات</label>
          <input className="nabd-input text-xs" value={f.notes} onChange={e => setVal("notes", e.target.value)} placeholder="اختياري" />
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <button onClick={onClose} className="carehub-btn-ghost flex-1 text-xs">إلغاء</button>
        <button onClick={handleSave} className="carehub-btn-primary flex-1 text-xs font-bold">💾 حفظ الإيراد</button>
      </div>
    </AdminModal>
  );
}

function MobileAdminControlView({
  nurses, patients, bookings, cases, invoices,
  onApproveNurse, onRejectNurse, onCreateCase, onUpdateCaseStatus, onDeleteCase,
  onNotify, onCreatePatient, onCreateNurse, onCreateInvoice,
  onDeletePatient, onDeleteNurse, onDeleteBooking, onDeleteInvoice,
  onUpdatePatient, onUpdateNurse, onUpdateBooking, onUpdateInvoice,
  onLogout,
}) {
  const [tab, setTab] = React.useState("overview");
  const [q, setQ] = React.useState("");
  const [actLog, addLog] = useActivityLog();
  const [revenues, setRevenues] = React.useState(() => {
    try { const s = localStorage.getItem("nabd_revenues"); return s ? JSON.parse(s) : []; } catch { return []; }
  });
  const [showAddPatient, setShowAddPatient] = React.useState(false);
  const [showAddRevenue, setShowAddRevenue] = React.useState(false);

  const P = (patients || []).filter(p => p && p.id);
  const N = (nurses || []).filter(n => n && n.id);
  const B = (bookings || []).filter(b => b && b.id);
  const I = (invoices || []).filter(i => i && i.id);

  const addRevenue = (rev) => {
    const updated = [rev, ...revenues];
    setRevenues(updated);
    try { localStorage.setItem("nabd_revenues", JSON.stringify(updated)); } catch {}
    addLog("إيراد جديد", rev.patientName, "", `${fmtCurrency(rev.amount)} — ${rev.service}`);
    onNotify(`✅ تم تسجيل إيراد: ${fmtCurrency(rev.amount)}`);
  };

  const savePatient = (newP) => {
    onCreatePatient(newP);
    addLog("إضافة مريض", newP.name, newP.phone, `الكود: ${newP.code}`);
    onNotify(`✅ تم إضافة المريض: ${newP.name}`);
  };

  const totalRevenue = revenues.reduce((s, r) => s + (Number(r.paid) || 0), 0);
  const todayRevenue = revenues.filter(r => r.date === new Date().toISOString().slice(0, 10)).reduce((s, r) => s + (Number(r.paid) || 0), 0);
  const weekRevenue = revenues.filter(r => new Date(r.createdAt) >= weekAgo()).reduce((s, r) => s + (Number(r.paid) || 0), 0);
  const monthRevenue = revenues.filter(r => new Date(r.createdAt) >= monthAgo()).reduce((s, r) => s + (Number(r.paid) || 0), 0);
  const completedB = B.filter(b => b.status === "completed" || b.status === "مكتمل").length;
  const cancelledB = B.filter(b => b.status === "cancelled" || b.status === "ملغي").length;
  const newB = B.filter(b => b.status === "confirmed" || b.status === "pending").length;

  const lq = q.toLowerCase();
  const fP = P.filter(p => !q || (p.name||"").toLowerCase().includes(lq) || (p.code||"").toLowerCase().includes(lq) || (p.phone||"").includes(lq) || (p.area||"").toLowerCase().includes(lq));
  const fN = N.filter(n => !q || (n.name||"").toLowerCase().includes(lq) || (n.phone||"").includes(lq) || (n.area||"").toLowerCase().includes(lq));
  const fB = B.filter(b => !q || (b.patientName||"").toLowerCase().includes(lq) || (b.serviceName||"").toLowerCase().includes(lq) || (b.area||"").toLowerCase().includes(lq));
  const fI = I.filter(i => !q || (i.patientName||"").toLowerCase().includes(lq) || (i.service||"").toLowerCase().includes(lq));
  const fR = revenues.filter(r => !q || (r.patientName||"").toLowerCase().includes(lq) || (r.service||"").toLowerCase().includes(lq));
  const fA = actLog.filter(a => !q || (a.type||"").includes(lq) || (a.userName||"").toLowerCase().includes(lq));

  const exportCSV = (rows, headers, filename) => {
    const csv = [headers.join(","), ...rows.map(r => headers.map(h => `"${(r[h] || "").toString().replace(/"/g,"''")}"`).join(","))].join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = filename;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    onNotify(`📥 تم تصدير ${filename}`);
  };

  const sendWA = (text) => window.open(`https://wa.me/20${BRAND.phone}?text=${encodeURIComponent(text)}`, "_blank");

  const TABS = [
    { key: "overview", label: "الرئيسية", icon: "📊" },
    { key: "patients", label: "المرضى", icon: "👥" },
    { key: "nurses", label: "الممرضون", icon: "👨‍⚕️" },
    { key: "bookings", label: "الحجوزات", icon: "📅" },
    { key: "revenue", label: "الإيرادات", icon: "💰" },
    { key: "invoices", label: "الفواتير", icon: "🧾" },
    { key: "services", label: "الخدمات", icon: "💉" },
    { key: "activity", label: "النشاط", icon: "📋" },
  ];

  return (
    <div className="flex flex-col gap-4" dir="rtl">

      {/* Header */}
      <div className="bg-gradient-to-l from-[#041C36] via-[#0d2d55] to-[#143B67] text-white rounded-3xl p-5 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#E39019] rounded-2xl flex items-center justify-center shadow-md">
              <UserCog size={24} />
            </div>
            <div>
              <h1 className="font-extrabold text-lg font-['Cairo']">لوحة التحكم — نبض</h1>
              <p className="text-xs text-slate-300">{BRAND.manager} · {todayDate()}</p>
            </div>
          </div>
          {onLogout && (
            <button onClick={() => { addLog("تسجيل خروج", BRAND.manager, BRAND.phone, "خروج من لوحة الإدارة"); onLogout(); }}
              className="text-xs bg-white/10 hover:bg-red-500 border border-white/20 px-3 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-all">
              <X size={13}/> خروج
            </button>
          )}
        </div>
        <div className="relative">
          <Search size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300" />
          <input className="w-full bg-white/10 text-white placeholder-slate-300 border border-white/20 rounded-2xl pr-9 pl-4 py-2.5 text-xs outline-none focus:bg-white/20 transition-all"
            placeholder="بحث باسم المريض، الهاتف، الكود، الخدمة..." value={q} onChange={e => setQ(e.target.value)} />
        </div>
      </div>

      {/* Tab Bar */}
      <div className="flex bg-white rounded-2xl border border-slate-200 shadow-sm overflow-x-auto gap-0.5 p-1">
        {TABS.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`flex-none py-2 px-2.5 rounded-xl text-[9px] font-black transition-all whitespace-nowrap flex flex-col items-center gap-0.5 min-w-[52px] ${tab === t.key ? "bg-[#143B67] text-white shadow-sm" : "text-slate-500 hover:bg-slate-100"}`}>
            <span className="text-sm">{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* ── Overview ── */}
      {tab === "overview" && (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <KpiCard label="إجمالي الإيرادات" value={fmtCurrency(totalRevenue)} icon="💰" color="#10B981"/>
            <KpiCard label="إيرادات اليوم" value={fmtCurrency(todayRevenue)} icon="📈" color="#E39019"/>
            <KpiCard label="إيرادات الأسبوع" value={fmtCurrency(weekRevenue)} icon="📅" color="#143B67"/>
            <KpiCard label="إيرادات الشهر" value={fmtCurrency(monthRevenue)} icon="📆" color="#041C36"/>
            <KpiCard label="إجمالي المرضى" value={P.length} icon="👥" color="#143B67"/>
            <KpiCard label="الممرضون" value={N.length} icon="👨‍⚕️" color="#041C36"/>
            <KpiCard label="حجوزات جديدة" value={newB} icon="📋" color="#E39019"/>
            <KpiCard label="زيارات مكتملة" value={completedB} icon="✅" color="#10B981"/>
            <KpiCard label="زيارات ملغاة" value={cancelledB} icon="❌" color="#EF4444"/>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <h3 className="font-extrabold text-sm text-[#041C36] mb-3 font-['Cairo']">⚡ إجراءات سريعة</h3>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setShowAddPatient(true)} className="carehub-btn-wa text-xs py-3 font-bold flex items-center justify-center gap-1.5 min-h-[44px] rounded-2xl">
                <UserPlus size={15}/> إضافة مريض
              </button>
              <button onClick={() => setShowAddRevenue(true)} className="carehub-btn-orange text-xs py-3 font-bold flex items-center justify-center gap-1.5 min-h-[44px] rounded-2xl">
                💰 تسجيل إيراد
              </button>
              <button onClick={() => setTab("bookings")} className="carehub-btn-primary text-xs py-3 font-bold flex items-center justify-center gap-1.5 min-h-[44px] rounded-2xl">
                <CalendarPlus size={15}/> الحجوزات
              </button>
              <button onClick={() => {
                const text = `📊 تقرير نبض اليومي\nالمرضى: ${P.length} | الممرضون: ${N.length}\nالحجوزات: ${B.length} | مكتملة: ${completedB}\nإيرادات اليوم: ${fmtCurrency(todayRevenue)}\nبتاريخ: ${todayDate()}`;
                sendWA(text);
                addLog("إرسال تقرير", BRAND.manager, BRAND.phone, "تقرير يومي");
              }} className="bg-[#10B981] text-white text-xs py-3 font-bold rounded-2xl flex items-center justify-center gap-1.5 min-h-[44px]">
                📱 تقرير واتساب
              </button>
              <button onClick={() => window.open(BRAND.googleSheetUrl, "_blank")} className="bg-slate-100 text-slate-700 text-xs py-3 font-bold rounded-2xl flex items-center justify-center gap-1.5 min-h-[44px] col-span-2">
                <FileSpreadsheet size={15}/> فتح جوجل شيت
              </button>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <h3 className="font-extrabold text-sm text-[#041C36]">🕐 آخر النشاطات</h3>
              <button onClick={() => setTab("activity")} className="text-[10px] font-bold text-[#143B67]">عرض الكل</button>
            </div>
            <div className="divide-y divide-slate-50">
              {actLog.slice(0, 6).map(a => (
                <div key={a.id} className="px-4 py-3 flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#EBF3FA] rounded-xl flex items-center justify-center text-base flex-shrink-0">📋</div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-slate-800 truncate">{a.type}</p>
                    <p className="text-[10px] text-slate-500">{a.userName} · {a.time}</p>
                  </div>
                  <StatusBadge status={a.status} />
                </div>
              ))}
              {actLog.length === 0 && <p className="text-center text-xs text-slate-400 py-6">لا توجد نشاطات</p>}
            </div>
          </div>
        </div>
      )}

      {/* ── Patients ── */}
      {tab === "patients" && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <div><h3 className="font-extrabold text-sm text-[#041C36] font-['Cairo']">👥 سِجل المرضى</h3><p className="text-[10px] text-slate-500">{fP.length} مريض</p></div>
            <div className="flex gap-2">
              <button onClick={() => exportCSV(fP, ["name","code","phone","area","healthStatus","pin"], "patients.csv")}
                className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-3 py-2 rounded-xl border border-emerald-200 flex items-center gap-1 min-h-[36px]">
                <Download size={12}/> تصدير
              </button>
              <button onClick={() => setShowAddPatient(true)} className="carehub-btn-wa text-xs py-2 px-3 font-bold flex items-center gap-1 min-h-[36px]">
                <UserPlus size={14}/> إضافة
              </button>
            </div>
          </div>
          {fP.map(p => (
            <div key={p.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-[#EBF3FA] to-white p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-extrabold text-sm text-[#041C36]">{p.name}</h4>
                      <StatusBadge status={p.healthStatus || "متابعة منزلية"} />
                    </div>
                    <p className="text-[10px] text-slate-500 mt-0.5 font-mono">{p.code} · {p.age ? `${p.age} سنة` : ""} {p.gender || ""}</p>
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <button onClick={() => { const n = prompt("تعديل الاسم:", p.name); if (n?.trim()) { onUpdatePatient(p.id, { name: n.trim() }); addLog("تعديل مريض", n.trim(), p.phone, `تغيير الاسم من ${p.name}`); onNotify("✅ تم التعديل"); }}}
                      className="p-1.5 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200"><Edit2 size={12}/></button>
                    <button onClick={() => { sendWA(`👤 بيانات المريض\nالاسم: ${p.name}\nالكود: ${p.code}\nالهاتف: ${p.phone}\nالمنطقة: ${p.area}`); addLog("إرسال واتساب", p.name, p.phone, "بيانات مريض"); }}
                      className="p-1.5 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-100"><MessageSquare size={12}/></button>
                    <button onClick={() => { if (confirm(`حذف المريض (${p.name})؟`)) { onDeletePatient(p.id); addLog("حذف مريض", p.name, p.phone, `حذف الكود ${p.code}`); onNotify(`🗑️ تم حذف ${p.name}`); }}}
                      className="p-1.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-100"><Trash2 size={12}/></button>
                  </div>
                </div>
              </div>
              <div className="px-4 pb-3 grid grid-cols-2 gap-1.5 text-[10px] mt-1">
                <p className="text-slate-600">📞 <span className="font-bold">{p.phone}</span></p>
                <p className="text-slate-600">📍 <span className="font-bold">{p.area}</span></p>
                <p className="text-slate-600">🔑 PIN: <span className="font-mono font-bold text-[#E39019]">{p.pin || "—"}</span></p>
                <p className="text-slate-600">🩺 <span className="font-bold">{p.requestReason || "—"}</span></p>
                {p.chronicSummary?.length > 0 && <p className="col-span-2 text-slate-500">🏥 {Array.isArray(p.chronicSummary) ? p.chronicSummary.join("، ") : p.chronicSummary}</p>}
              </div>
              <div className="px-4 pb-4 flex gap-2">
                <a href={`tel:${p.phone}`} className="flex-1 bg-[#143B67] text-white text-[10px] font-bold py-2 rounded-xl flex items-center justify-center gap-1 min-h-[34px]"><Phone size={11}/> اتصال</a>
                <a href={`https://wa.me/20${p.phone}`} target="_blank" rel="noreferrer" className="flex-1 bg-[#10B981] text-white text-[10px] font-bold py-2 rounded-xl flex items-center justify-center gap-1 min-h-[34px]"><MessageSquare size={11}/> واتساب</a>
                <button onClick={() => { navigator.clipboard.writeText(`${p.name} | ${p.code} | ${p.phone} | ${p.area}`); onNotify("✅ تم النسخ"); }}
                  className="flex-1 bg-slate-100 text-slate-700 text-[10px] font-bold py-2 rounded-xl flex items-center justify-center gap-1 min-h-[34px]"><Copy size={11}/> نسخ</button>
              </div>
            </div>
          ))}
          {fP.length === 0 && <div className="text-center py-10 text-slate-400 text-sm bg-white rounded-2xl border border-slate-200">لا يوجد مرضى</div>}
        </div>
      )}

      {/* ── Nurses ── */}
      {tab === "nurses" && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <div><h3 className="font-extrabold text-sm text-[#041C36] font-['Cairo']">👨‍⚕️ طاقم التمريض</h3><p className="text-[10px] text-slate-500">{fN.length} ممرض</p></div>
            <button onClick={() => exportCSV(fN, ["name","jobCode","phone","area","degree","exp","rating","status"], "nurses.csv")}
              className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-3 py-2 rounded-xl border border-emerald-200 flex items-center gap-1 min-h-[36px]">
              <Download size={12}/> تصدير
            </button>
          </div>
          {fN.map(n => (
            <div key={n.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
              <div className="flex items-center gap-3 mb-3">
                <img src={n.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(n.name || "N")}&background=143B67&color=fff`}
                  alt={n.name} className="w-14 h-14 rounded-2xl object-cover border-2 border-[#143B67] flex-shrink-0"/>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-extrabold text-sm text-[#041C36]">{n.name}</h4>
                    <StatusBadge status={n.status || "active"}/>
                  </div>
                  <p className="text-[10px] text-slate-500 font-mono">{n.jobCode} · {n.area}</p>
                  <p className="text-[10px] text-amber-600 font-bold">⭐ {n.rating || "5.0"}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <button onClick={() => { const nm = prompt("تعديل اسم الممرض:", n.name); if (nm?.trim()) { onUpdateNurse(n.id, { name: nm.trim() }); addLog("تعديل ممرض", nm.trim(), n.phone, "تغيير الاسم"); onNotify("✅ تم التعديل"); }}}
                    className="p-1.5 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200"><Edit2 size={12}/></button>
                  <button onClick={() => { if (confirm(`حذف الممرض (${n.name})؟`)) { onDeleteNurse(n.id); addLog("حذف ممرض", n.name, n.phone, "حذف من السجل"); onNotify(`🗑️ تم حذف ${n.name}`); }}}
                    className="p-1.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-100"><Trash2 size={12}/></button>
                </div>
              </div>
              <div className="text-[10px] text-slate-600 bg-slate-50 p-3 rounded-xl mb-3 grid grid-cols-2 gap-1">
                <p>🎓 {n.degree || "—"} ({n.exp || "0"} سنوات)</p>
                <p>📞 {n.phone}</p>
                <p>🪪 {n.nationalId || "—"}</p>
                <p>📋 {n.license || "—"}</p>
              </div>
              <div className="flex gap-2">
                <a href={`tel:${n.phone}`} className="flex-1 bg-[#143B67] text-white text-[10px] font-bold py-2 rounded-xl flex items-center justify-center gap-1 min-h-[34px]"><Phone size={11}/> اتصال</a>
                <a href={`https://wa.me/20${n.phone}`} target="_blank" rel="noreferrer" className="flex-1 bg-[#10B981] text-white text-[10px] font-bold py-2 rounded-xl flex items-center justify-center gap-1 min-h-[34px]"><MessageSquare size={11}/> واتساب</a>
                <button onClick={() => { onUpdateNurse(n.id, { status: n.status === "approved" ? "pending" : "approved" }); addLog(n.status === "approved" ? "تعليق ممرض" : "قبول ممرض", n.name, n.phone, "تغيير الحالة"); onNotify("✅ تم تحديث الحالة"); }}
                  className={`flex-1 text-[10px] font-bold py-2 rounded-xl flex items-center justify-center gap-1 min-h-[34px] ${n.status === "approved" ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"}`}>
                  {n.status === "approved" ? <><AlertTriangle size={11}/>تعليق</> : <><CheckCircle size={11}/>قبول</>}
                </button>
              </div>
            </div>
          ))}
          {fN.length === 0 && <div className="text-center py-10 text-slate-400 text-sm bg-white rounded-2xl border border-slate-200">لا يوجد ممرضون</div>}
        </div>
      )}

      {/* ── Bookings ── */}
      {tab === "bookings" && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <div><h3 className="font-extrabold text-sm text-[#041C36] font-['Cairo']">📅 سِجل الحجوزات</h3><p className="text-[10px] text-slate-500">{fB.length} حجز</p></div>
            <button onClick={() => exportCSV(fB, ["patientName","serviceName","date","time","area","status","nurseName"], "bookings.csv")}
              className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-3 py-2 rounded-xl border border-emerald-200 flex items-center gap-1 min-h-[36px]">
              <Download size={12}/> تصدير
            </button>
          </div>
          {fB.map(b => (
            <div key={b.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <h4 className="font-extrabold text-sm text-[#041C36]">{b.patientName || "مريض"}</h4>
                  <p className="text-[10px] text-slate-500">{b.serviceName || b.service || "خدمة تمريضية"}</p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <StatusBadge status={b.status}/>
                  <button onClick={() => { const statuses = ["confirmed","completed","cancelled","pending"]; const next = statuses[(statuses.indexOf(b.status) + 1) % statuses.length]; onUpdateBooking(b.id, { status: next }); addLog("تعديل حجز", b.patientName, b.phone, `الحالة → ${next}`); onNotify("✅ تم التحديث"); }}
                    className="p-1.5 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200" title="تغيير الحالة"><RefreshCw size={11}/></button>
                  <button onClick={() => { if (confirm("حذف الحجز؟")) { onDeleteBooking(b.id); addLog("حذف حجز", b.patientName, b.phone, b.id); onNotify("🗑️ تم الحذف"); }}}
                    className="p-1.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-100"><Trash2 size={11}/></button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-1.5 text-[10px] text-slate-600 bg-slate-50 p-2.5 rounded-xl mb-3">
                <p>📅 {b.date} ({b.time})</p>
                <p>📍 {b.area}</p>
                <p>👨‍⚕️ {b.nurseName || "—"}</p>
                <p>💰 {b.price ? fmtCurrency(b.price) : "—"}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { sendWA(`📅 تفاصيل الحجز\nالمريض: ${b.patientName}\nالخدمة: ${b.serviceName || b.service}\nالموعد: ${b.date} ${b.time}\nالمنطقة: ${b.area}`); addLog("إرسال واتساب حجز", b.patientName, b.phone, "تفاصيل الحجز"); }}
                  className="flex-1 bg-[#10B981] text-white text-[10px] font-bold py-2 rounded-xl flex items-center justify-center gap-1 min-h-[34px]"><MessageSquare size={11}/> واتساب</button>
                <button onClick={() => { onUpdateBooking(b.id, { status: "completed" }); addLog("إنهاء زيارة", b.patientName, b.phone, b.id); onNotify("✅ تم تسجيل الإنهاء"); }}
                  className="flex-1 bg-blue-50 text-blue-600 text-[10px] font-bold py-2 rounded-xl flex items-center justify-center gap-1 min-h-[34px]"><CheckCircle size={11}/> إنهاء</button>
                <button onClick={() => { onUpdateBooking(b.id, { status: "cancelled" }); addLog("إلغاء حجز", b.patientName, b.phone, b.id); onNotify("🚫 تم الإلغاء"); }}
                  className="flex-1 bg-red-50 text-red-500 text-[10px] font-bold py-2 rounded-xl flex items-center justify-center gap-1 min-h-[34px]"><X size={11}/> إلغاء</button>
              </div>
            </div>
          ))}
          {fB.length === 0 && <div className="text-center py-10 text-slate-400 text-sm bg-white rounded-2xl border border-slate-200">لا توجد حجوزات</div>}
        </div>
      )}

      {/* ── Revenue ── */}
      {tab === "revenue" && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <div><h3 className="font-extrabold text-sm text-[#041C36] font-['Cairo']">💰 سِجل الإيرادات</h3><p className="text-[10px] text-slate-500">إجمالي: {fmtCurrency(totalRevenue)}</p></div>
            <div className="flex gap-2">
              <button onClick={() => exportCSV(fR, ["patientName","service","amount","discount","paid","remaining","method","date"], "revenues.csv")}
                className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-3 py-2 rounded-xl border border-emerald-200 flex items-center gap-1 min-h-[36px]">
                <Download size={12}/> تصدير
              </button>
              <button onClick={() => setShowAddRevenue(true)} className="carehub-btn-orange text-xs py-2 px-3 font-bold flex items-center gap-1 min-h-[36px]">💰 إضافة</button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <KpiCard label="اليوم" value={fmtCurrency(todayRevenue)} icon="📈" color="#E39019"/>
            <KpiCard label="الأسبوع" value={fmtCurrency(weekRevenue)} icon="📅" color="#143B67"/>
            <KpiCard label="الشهر" value={fmtCurrency(monthRevenue)} icon="📆" color="#041C36"/>
            <KpiCard label="الإجمالي" value={fmtCurrency(totalRevenue)} icon="💰" color="#10B981"/>
          </div>
          {fR.map(r => (
            <div key={r.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
              <div className="flex items-start justify-between mb-2">
                <div><h4 className="font-extrabold text-sm text-[#041C36]">{r.patientName || "غير محدد"}</h4><p className="text-[10px] text-slate-500">{r.service}</p></div>
                <div className="text-left"><p className="font-extrabold text-base text-[#10B981]">{fmtCurrency(r.paid)}</p><p className="text-[10px] text-slate-400">{r.date}</p></div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-[10px] bg-slate-50 p-2.5 rounded-xl">
                <div className="text-center"><p className="text-slate-400">القيمة</p><p className="font-bold text-slate-800">{fmtCurrency(r.amount)}</p></div>
                <div className="text-center border-x border-slate-200"><p className="text-slate-400">الخصم</p><p className="font-bold text-red-500">{fmtCurrency(r.discount)}</p></div>
                <div className="text-center"><p className="text-slate-400">المتبقي</p><p className="font-bold text-amber-600">{fmtCurrency(r.remaining)}</p></div>
              </div>
              <p className="text-[10px] text-slate-400 mt-2">طريقة الدفع: <strong>{r.method}</strong></p>
            </div>
          ))}
          {fR.length === 0 && <div className="text-center py-10 text-slate-400 text-sm bg-white rounded-2xl border border-slate-200">لا توجد إيرادات مسجلة</div>}
        </div>
      )}

      {/* ── Invoices ── */}
      {tab === "invoices" && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <div><h3 className="font-extrabold text-sm text-[#041C36] font-['Cairo']">🧾 سِجل الفواتير</h3><p className="text-[10px] text-slate-500">{fI.length} فاتورة</p></div>
            <button onClick={() => exportCSV(fI, ["id","patientName","service","amount","status","date"], "invoices.csv")}
              className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-3 py-2 rounded-xl border border-emerald-200 flex items-center gap-1 min-h-[36px]">
              <Download size={12}/> تصدير
            </button>
          </div>
          {fI.map(inv => (
            <div key={inv.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="font-mono text-[10px] text-slate-400">{inv.id}</p>
                <p className="font-extrabold text-sm text-[#041C36] truncate">{inv.patientName}</p>
                <p className="text-[10px] text-slate-500">{inv.service} · {inv.date}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <p className="font-extrabold text-base text-[#041C36]">{inv.amount}</p>
                <StatusBadge status={inv.status}/>
                <div className="flex gap-1 mt-1">
                  <button onClick={() => { const am = prompt("تعديل المبلغ:", inv.amount); if (am?.trim()) { onUpdateInvoice(inv.id, { amount: am.trim() }); addLog("تعديل فاتورة", inv.patientName, "", `المبلغ الجديد: ${am}`); onNotify("✅ تم التعديل"); }}}
                    className="p-1 bg-slate-100 text-slate-600 rounded-lg"><Edit2 size={11}/></button>
                  <button onClick={() => { if (confirm("حذف الفاتورة؟")) { onDeleteInvoice(inv.id); addLog("حذف فاتورة", inv.patientName, "", inv.id); onNotify("🗑️ تم الحذف"); }}}
                    className="p-1 bg-red-50 text-red-500 rounded-lg"><Trash2 size={11}/></button>
                  <button onClick={() => { sendWA(`🧾 فاتورة: ${inv.id}\nالمريض: ${inv.patientName}\nالخدمة: ${inv.service}\nالمبلغ: ${inv.amount}`); addLog("إرسال فاتورة", inv.patientName, "", inv.id); }}
                    className="p-1 bg-emerald-50 text-emerald-600 rounded-lg"><MessageSquare size={11}/></button>
                </div>
              </div>
            </div>
          ))}
          {fI.length === 0 && <div className="text-center py-10 text-slate-400 text-sm bg-white rounded-2xl border border-slate-200">لا توجد فواتير</div>}
        </div>
      )}

      {/* ── Services ── */}
      {tab === "services" && (
        <div className="flex flex-col gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-extrabold text-sm text-[#041C36] font-['Cairo'] mb-1">💉 دليل الخدمات والأسعار</h3>
            <p className="text-[10px] text-slate-500">{FLAT_SERVICES.length} خدمة</p>
          </div>
          {CATEGORIZED_SERVICES.map((cat, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 shadow-sm">
              <div className="p-4 border-b border-slate-100">
                <h3 className="font-extrabold text-sm text-[#143B67] font-['Cairo']">{cat.category}</h3>
              </div>
              <div className="divide-y divide-slate-50">
                {cat.items.map(item => {
                  const Icon = item.icon || Syringe;
                  return (
                    <div key={item.id} className="p-4 flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#EBF3FA] rounded-2xl flex items-center justify-center flex-shrink-0">
                        <Icon size={18} className="text-[#143B67]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-xs text-slate-900">{item.name}</p>
                        <p className="text-[10px] text-slate-500 truncate">{item.desc}</p>
                      </div>
                      <button onClick={() => sendWA(`🏥 الخدمة: ${item.name}\nنبض للتمريض المنزلي - دمياط\n📞 ${BRAND.phone}`)}
                        className="p-2 bg-emerald-50 text-emerald-600 rounded-xl flex-shrink-0"><MessageSquare size={13}/></button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Activity Log ── */}
      {tab === "activity" && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <div><h3 className="font-extrabold text-sm text-[#041C36] font-['Cairo']">📋 سِجل نشاط النظام</h3><p className="text-[10px] text-slate-500">{fA.length} عملية</p></div>
            <div className="flex gap-2">
              <button onClick={() => exportCSV(fA, ["id","type","userName","phone","details","executor","status","date","time"], "activity.csv")}
                className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-3 py-2 rounded-xl border border-emerald-200 flex items-center gap-1 min-h-[36px]">
                <Download size={12}/> تصدير
              </button>
              <button onClick={() => { if (confirm("مسح جميع سجلات النشاط؟")) { localStorage.removeItem("nabd_activity_log"); window.location.reload(); }}}
                className="bg-red-50 text-red-500 text-[10px] font-bold px-3 py-2 rounded-xl border border-red-200 min-h-[36px]">🗑️ مسح</button>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-50">
            {fA.map((a, idx) => (
              <div key={a.id} className="p-4 flex items-start gap-3">
                <div className="w-8 h-8 bg-[#EBF3FA] rounded-xl flex items-center justify-center text-xs font-black text-[#143B67] flex-shrink-0">{idx + 1}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-xs font-extrabold text-slate-900">{a.type}</p>
                    <StatusBadge status={a.status}/>
                  </div>
                  <p className="text-[10px] text-slate-600 mt-0.5">👤 {a.userName} {a.phone !== "—" ? `· ${a.phone}` : ""}</p>
                  <p className="text-[10px] text-slate-500">📝 {a.details}</p>
                  <p className="text-[10px] text-slate-400">🕐 {a.date} — {a.time} · {a.executor}</p>
                </div>
              </div>
            ))}
            {fA.length === 0 && <div className="text-center py-10 text-slate-400 text-sm">لا توجد نشاطات مسجلة</div>}
          </div>
        </div>
      )}

      {/* Modals */}
      {showAddPatient && <AddPatientFullModal onClose={() => setShowAddPatient(false)} onSave={savePatient} onNotify={onNotify} />}
      {showAddRevenue && <AddRevenueModal patients={P} onClose={() => setShowAddRevenue(false)} onSave={addRevenue} onNotify={onNotify} />}
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

  const [tab, setTab] = useState(() => getTabFromHash());
  const [patients, setPatients] = useState(() => buildSeedPatients());
  const [nurses, setNurses] = useState(() => buildSeedNurses());
  const [bookings, setBookings] = useState(() => buildSeedBookings());
  const [cases, setCases] = useState([]);
  const [invoices, setInvoices] = useState(() => buildSeedInvoices());
  const [toastMessage, setToastMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [adminUnlocked, setAdminUnlocked] = useState(true);
  const [showAdminPin, setShowAdminPin] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  useEffect(() => {
    const handleHashChange = () => {
      setTab(getTabFromHash());
    };
    window.addEventListener("hashchange", handleHashChange);
    setTab(getTabFromHash());
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const changeTab = (newTab) => {
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
              onGoToAppointments={() => changeTab("admin")}
            />
          )}
          {tab === "admin" && (
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
                changeTab("home");
                showToast("تم الانتقال إلى الصفحة الرئيسية 🏠");
              }}
            />
          )}
          {tab !== "admin" && <NabdFooter />}
        </main>

        <NabdBottomNav currentTab={tab} onChangeTab={changeTab} adminUnlocked={adminUnlocked} />
      </div>
    </NabdErrorBoundary>
  );
}
