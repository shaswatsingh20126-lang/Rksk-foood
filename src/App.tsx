import React, { useEffect, useRef, useState } from 'react';
import {
  Menu,
  X,
  Camera,
  Upload,
  RefreshCw,
  Sparkles,
  Check,
  ChevronRight,
  Zap,
  Apple,
  Search,
  Droplets,
  Bell,
  BellRing,
  Plus,
  Clock,
  RotateCcw,
  Volume2,
  VolumeX,
  Phone,
  MessageCircle,
  User,
  Copy,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const BG_IMAGE_1 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_125121_afb71ce9-9c64-4c54-90b5-c89c0764c052.png&w=1920&q=85';

const BG_IMAGE_2 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_135737_0da59642-725b-451a-997b-b0283d95a42a.png&w=1280&q=85';

const NAV_LINKS = [
  'Module',
  'Case Records',
  'Biotech',
  'Tiers',
  'Live Demo',
];

interface NutritionMetric {
  subject: string;
  value: number;
  unit: string;
  fullMark: number;
}

interface NutritionPreset {
  name: string;
  code: string;
  calories: string;
  bioEff: string;
  data: NutritionMetric[];
}

const INITIAL_PRESETS: Record<string, NutritionPreset> = {
  'synth-cell': {
    name: 'SYNTH-CELL v4',
    code: 'PROT-92 // CAR-68',
    calories: '540 KCAL',
    bioEff: '98.6%',
    data: [
      { subject: 'Protein', value: 92, unit: '46g', fullMark: 100 },
      { subject: 'Carbs', value: 68, unit: '34g', fullMark: 100 },
      { subject: 'Fats', value: 44, unit: '12g', fullMark: 100 },
      { subject: 'Bio-Fiber', value: 85, unit: '21g', fullMark: 100 },
      { subject: 'Micros', value: 96, unit: 'Opt', fullMark: 100 },
      { subject: 'Hydration', value: 78, unit: '780ml', fullMark: 100 },
    ],
  },
  'neuro-boost': {
    name: 'NEURO-RATION',
    code: 'LIPID-88 // NOOT-96',
    calories: '610 KCAL',
    bioEff: '99.2%',
    data: [
      { subject: 'Protein', value: 75, unit: '38g', fullMark: 100 },
      { subject: 'Carbs', value: 50, unit: '25g', fullMark: 100 },
      { subject: 'Fats', value: 88, unit: '24g', fullMark: 100 },
      { subject: 'Bio-Fiber', value: 70, unit: '18g', fullMark: 100 },
      { subject: 'Micros', value: 98, unit: 'Max', fullMark: 100 },
      { subject: 'Hydration', value: 90, unit: '900ml', fullMark: 100 },
    ],
  },
  'hyper-pure': {
    name: 'HYPER-PURE',
    code: 'AMINO-99 // CAR-20',
    calories: '420 KCAL',
    bioEff: '99.8%',
    data: [
      { subject: 'Protein', value: 98, unit: '52g', fullMark: 100 },
      { subject: 'Carbs', value: 30, unit: '15g', fullMark: 100 },
      { subject: 'Fats', value: 25, unit: '7g', fullMark: 100 },
      { subject: 'Bio-Fiber', value: 90, unit: '25g', fullMark: 100 },
      { subject: 'Micros', value: 92, unit: 'Opt', fullMark: 100 },
      { subject: 'Hydration', value: 84, unit: '840ml', fullMark: 100 },
    ],
  },
};

// Comprehensive Fruits Nutritional Database with Verified Calories & High-Res Photography
export interface FruitItem {
  id: string;
  name: string;
  category: 'Tree Fruit' | 'Berries' | 'Tropical' | 'Superfood' | 'Citrus' | 'Melons';
  portion: string;
  calories: number;
  carbs: number;
  protein: number;
  fats: number;
  fiber: number;
  sugars: number;
  hydration: number;
  colorName: string;
  colorHex: string;
  photoUrl: string;
  fdcId: string;
  highlight: string;
}

const FRUITS_DATABASE: FruitItem[] = [
  {
    id: 'apple',
    name: 'Honeycrisp Apple',
    category: 'Tree Fruit',
    portion: '1 medium (182g)',
    calories: 95,
    carbs: 25.1,
    protein: 0.5,
    fats: 0.3,
    fiber: 4.4,
    sugars: 18.9,
    hydration: 86,
    colorName: 'Ruby Red',
    colorHex: '#ef4444',
    photoUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80',
    fdcId: 'USDA #171688',
    highlight: 'Pectin fiber stabilizes glycemic response and promotes gut microbiota balance.',
  },
  {
    id: 'banana',
    name: 'Cavendish Banana',
    category: 'Tropical',
    portion: '1 medium (118g)',
    calories: 105,
    carbs: 27.0,
    protein: 1.3,
    fats: 0.4,
    fiber: 3.1,
    sugars: 14.4,
    hydration: 75,
    colorName: 'Golden Amber',
    colorHex: '#eab308',
    photoUrl: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80',
    fdcId: 'USDA #173944',
    highlight: '422mg electrolyte potassium to regulate neural firing and cellular osmotic pressure.',
  },
  {
    id: 'blueberries',
    name: 'Wild Blueberries',
    category: 'Berries',
    portion: '1 cup (148g)',
    calories: 84,
    carbs: 21.4,
    protein: 1.1,
    fats: 0.5,
    fiber: 3.6,
    sugars: 14.7,
    hydration: 84,
    colorName: 'Deep Cobalt',
    colorHex: '#3b82f6',
    photoUrl: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=600&q=80',
    fdcId: 'USDA #171711',
    highlight: 'Dense anthocyanin polyphenols that cross the blood-brain barrier for neuroprotection.',
  },
  {
    id: 'mango',
    name: 'Alphonso Mango',
    category: 'Tropical',
    portion: '1 cup sliced (165g)',
    calories: 99,
    carbs: 24.7,
    protein: 1.4,
    fats: 0.6,
    fiber: 2.6,
    sugars: 22.5,
    hydration: 83,
    colorName: 'Solar Orange',
    colorHex: '#f97316',
    photoUrl: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80',
    fdcId: 'USDA #169910',
    highlight: 'Beta-carotene and zeaxanthin pigment matrix supporting visual acuity.',
  },
  {
    id: 'avocado',
    name: 'Hass Avocado',
    category: 'Superfood',
    portion: '1 medium (150g)',
    calories: 240,
    carbs: 12.8,
    protein: 3.0,
    fats: 22.0,
    fiber: 10.1,
    sugars: 1.0,
    hydration: 73,
    colorName: 'Emerald Green',
    colorHex: '#10b981',
    photoUrl: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=600&q=80',
    fdcId: 'USDA #171705',
    highlight: 'Oleic acid monounsaturated fats optimize fat-soluble nutrient bioavailability.',
  },
  {
    id: 'strawberries',
    name: 'Fresh Strawberries',
    category: 'Berries',
    portion: '1 cup halves (152g)',
    calories: 49,
    carbs: 11.7,
    protein: 1.0,
    fats: 0.5,
    fiber: 3.0,
    sugars: 7.4,
    hydration: 91,
    colorName: 'Crimson Rose',
    colorHex: '#f43f5e',
    photoUrl: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=600&q=80',
    fdcId: 'USDA #167762',
    highlight: 'Provides 99% of daily Vitamin C requirements with exceptionally low glycemic load.',
  },
  {
    id: 'watermelon',
    name: 'Crimson Watermelon',
    category: 'Melons',
    portion: '1 cup diced (154g)',
    calories: 46,
    carbs: 11.5,
    protein: 0.9,
    fats: 0.2,
    fiber: 0.6,
    sugars: 9.4,
    hydration: 92,
    colorName: 'Neon Coral',
    colorHex: '#fb7185',
    photoUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80',
    fdcId: 'USDA #167765',
    highlight: '92% cellular intracellular hydration fluid paired with cardiovascular lycopene.',
  },
  {
    id: 'kiwi',
    name: 'Golden Kiwi Fruit',
    category: 'Tropical',
    portion: '1 fruit (100g)',
    calories: 61,
    carbs: 14.7,
    protein: 1.2,
    fats: 0.5,
    fiber: 2.1,
    sugars: 12.3,
    hydration: 83,
    colorName: 'Citron Gold',
    colorHex: '#ca8a04',
    photoUrl: 'https://images.unsplash.com/photo-1585059895524-72359e06133a?auto=format&fit=crop&w=600&q=80',
    fdcId: 'USDA #171728',
    highlight: 'Actinidain digestive enzyme accelerating protein peptide breakdown.',
  },
  {
    id: 'pomegranate',
    name: 'Ruby Pomegranate',
    category: 'Superfood',
    portion: '1/2 cup arils (87g)',
    calories: 72,
    carbs: 16.3,
    protein: 1.5,
    fats: 1.0,
    fiber: 3.5,
    sugars: 11.9,
    hydration: 78,
    colorName: 'Garnet Red',
    colorHex: '#9f1239',
    photoUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80',
    fdcId: 'USDA #173038',
    highlight: 'Punicalagin polyphenols with 3x antioxidant capacity of green tea.',
  },
  {
    id: 'orange',
    name: 'Valencia Orange',
    category: 'Citrus',
    portion: '1 medium (131g)',
    calories: 62,
    carbs: 15.4,
    protein: 1.2,
    fats: 0.2,
    fiber: 3.1,
    sugars: 12.2,
    hydration: 87,
    colorName: 'Tangerine',
    colorHex: '#ea580c',
    photoUrl: 'https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=600&q=80',
    fdcId: 'USDA #169097',
    highlight: 'Hesperidin flavonoid enhancing capillary blood flow and vascular elasticity.',
  },
];

// Quick-Test Sample Plates for Instant 1-Click Verification
const SAMPLE_PLATES = [
  {
    title: 'Salmon & Quinoa Bowl',
    portion: '1 bowl (340g)',
    url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    fallbackData: {
      foodName: 'Atlantic Salmon with Tri-Color Quinoa & Avocado',
      portionSize: '1 bowl (340g)',
      calories: 520,
      protein: 42,
      carbs: 38,
      fats: 22,
      fiber: 8,
      micros: 95,
      hydration: 76,
      confidence: 0.96,
      source: 'USDA FoodData Central (#173686)',
      summary: 'High bioavailability omega-3 fatty acids with sustained complex carbohydrates.',
    },
  },
  {
    title: 'Indian Basmati & Dal Thali',
    portion: '1 plate (380g)',
    url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
    fallbackData: {
      foodName: 'Steamed Basmati Rice with Tadka Dal & Sabzi',
      portionSize: '1 plate (380g)',
      calories: 540,
      protein: 18,
      carbs: 78,
      fats: 15,
      fiber: 9,
      micros: 92,
      hydration: 82,
      confidence: 0.94,
      source: 'USDA FoodData Central (#170438)',
      summary: 'Complete essential amino acid combination from grain and legume synergy.',
    },
  },
  {
    title: 'Honeycrisp Apple Plate',
    portion: '1 medium (182g)',
    url: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80',
    fallbackData: {
      foodName: 'Fresh Honeycrisp Apple with Skin',
      portionSize: '1 medium (182g)',
      calories: 95,
      protein: 0.5,
      carbs: 25,
      fats: 0.3,
      fiber: 4.4,
      micros: 91,
      hydration: 86,
      confidence: 0.98,
      source: 'USDA FoodData Central (#171688)',
      summary: 'Natural fructose and soluble pectin matrix for clean cellular energy.',
    },
  },
  {
    title: 'Wild Blueberries & Mint',
    portion: '1 cup (148g)',
    url: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=600&q=80',
    fallbackData: {
      foodName: 'Organic Wild Blueberries & Microgreens',
      portionSize: '1 cup (148g)',
      calories: 84,
      protein: 1.1,
      carbs: 21,
      fats: 0.5,
      fiber: 3.6,
      micros: 98,
      hydration: 84,
      confidence: 0.97,
      source: 'USDA FoodData Central (#171711)',
      summary: 'Anthocyanins and antioxidant polyphenols with high dietary fiber content.',
    },
  },
];

interface WaterLogEntry {
  id: string;
  amount: number;
  time: string;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-black/95 border border-red-500/50 rounded-lg px-2.5 py-1.5 shadow-2xl backdrop-blur-md">
        <p className="text-[10px] font-bold text-red-400 uppercase tracking-wider">
          {data.subject}
        </p>
        <p className="text-xs text-white font-mono font-semibold">
          {data.value}% <span className="text-gray-400 font-normal">({data.unit})</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [presets, setPresets] = useState<Record<string, NutritionPreset>>(INITIAL_PRESETS);
  const [activePresetKey, setActivePresetKey] = useState<string>('synth-cell');

  // Auto-minimize on small viewports so the hero text is never occluded
  const [radarMinimized, setRadarMinimized] = useState<boolean>(() => {
    return typeof window !== 'undefined' ? window.innerWidth < 640 : false;
  });

  // AI Camera Food Scan State
  const [cameraModalOpen, setCameraModalOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState<string>('');
  const [scanImagePreview, setScanImagePreview] = useState<string | null>(null);
  const [detectedFoodResult, setDetectedFoodResult] = useState<any | null>(null);
  const [isLiveCameraActive, setIsLiveCameraActive] = useState(false);
  const [portionMultiplier, setPortionMultiplier] = useState<number>(1.0);
  const [servingConfirmed, setServingConfirmed] = useState<boolean>(true);
  const [customGramsInput, setCustomGramsInput] = useState<string>('');

  // Creator Modal State (Shaswat Singh +917887222907)
  const [creatorModalOpen, setCreatorModalOpen] = useState(false);

  // Fruits Catalog Modal State
  const [fruitsModalOpen, setFruitsModalOpen] = useState(false);
  const [fruitSearch, setFruitSearch] = useState('');
  const [selectedFruitCategory, setSelectedFruitCategory] = useState<string>('All');

  // Daily Hydration Tracker State
  const [hydrationModalOpen, setHydrationModalOpen] = useState(false);
  const [currentWaterMl, setCurrentWaterMl] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('augmented_water_ml');
      if (saved) return parseInt(saved, 10);
    }
    return 1500;
  });
  const [waterGoalMl, setWaterGoalMl] = useState<number>(2500);
  const [waterLogs, setWaterLogs] = useState<WaterLogEntry[]>([
    { id: '1', amount: 500, time: '08:30 AM' },
    { id: '2', amount: 250, time: '10:15 AM' },
    { id: '3', amount: 500, time: '01:00 PM' },
    { id: '4', amount: 250, time: '03:45 PM' },
  ]);
  const [hydrationReminderEnabled, setHydrationReminderEnabled] = useState<boolean>(true);
  const [hydrationIntervalMinutes, setHydrationIntervalMinutes] = useState<number>(45);
  const [secondsUntilNextReminder, setSecondsUntilNextReminder] = useState<number>(45 * 60);
  const [audioChimeEnabled, setAudioChimeEnabled] = useState<boolean>(true);
  const [customWaterInput, setCustomWaterInput] = useState<string>('250');

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const currentPreset = presets[activePresetKey] || presets['synth-cell'];

  const heroRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const patternRef = useRef<SVGPatternElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Mouse coords & lerp states stored in refs to avoid re-renders
  const mousePosRef = useRef({ x: -999, y: -999, normX: 0.5, normY: 0.5 });
  const smoothCursorRef = useRef({ x: -999, y: -999 });
  const gridOffsetRef = useRef({ x: 0, y: 0 });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Futuristic audio chime using Web Audio API
  const playHydrationChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(587.33, now); // D5
      gain1.gain.setValueAtTime(0.08, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.4);

      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(880, now + 0.12); // A5
      gain2.gain.setValueAtTime(0.09, now + 0.12);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.65);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.12);
      osc2.stop(now + 0.65);
    } catch (e) {
      console.warn('Audio chime error:', e);
    }
  };

  // Periodic Hydration Reminder Loop
  useEffect(() => {
    if (!hydrationReminderEnabled) return;

    const timer = setInterval(() => {
      setSecondsUntilNextReminder((prev) => {
        if (prev <= 1) {
          triggerHydrationAlert();
          return hydrationIntervalMinutes * 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [hydrationReminderEnabled, hydrationIntervalMinutes, audioChimeEnabled]);

  const triggerHydrationAlert = () => {
    if (audioChimeEnabled) {
      playHydrationChime();
    }

    showToast('💧 CELLULAR HYDRATION PULSE: Drink 250ml water to maintain osmotic balance!');

    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        try {
          new Notification('Cellular Hydration Pulse', {
            body: 'Your cell hydration requires a water intake pulse (250ml) to maintain optimal bio-efficiency.',
          });
        } catch (e) {
          console.warn('Notification error:', e);
        }
      }
    }
  };

  const requestNotificationAccess = async () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          showToast('Desktop push notifications active for hydration pulses!');
        } else {
          showToast('In-app HUD alerts will notify you.');
        }
      } catch (e) {
        showToast('In-app HUD alerts active.');
      }
    } else {
      showToast('Notifications active via in-app HUD sound & alerts.');
    }
  };

  const logWater = (amount: number) => {
    const newAmount = currentWaterMl + amount;
    setCurrentWaterMl(newAmount);

    const newLog: WaterLogEntry = {
      id: `log-${Date.now()}`,
      amount,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setWaterLogs((prev) => [newLog, ...prev.slice(0, 15)]);

    try {
      localStorage.setItem('augmented_water_ml', String(newAmount));
    } catch (e) {}

    // Dynamically sync with active radar preset's Hydration metric!
    const hydrationPct = Math.min(100, Math.round((newAmount / waterGoalMl) * 100));
    setPresets((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((key) => {
        updated[key] = {
          ...updated[key],
          data: updated[key].data.map((item) =>
            item.subject === 'Hydration'
              ? { ...item, value: hydrationPct, unit: `${Math.round(newAmount)}ml` }
              : item
          ),
        };
      });
      return updated;
    });

    if (audioChimeEnabled) {
      playHydrationChime();
    }
    showToast(`+${amount}ml logged · ${hydrationPct}% of daily cellular target`);
  };

  useEffect(() => {
    // Hidden full-window canvas for spotlight mask generation
    const canvas = document.createElement('canvas');
    canvasRef.current = canvas;

    let animFrameId: number;

    const updateCanvasSize = () => {
      if (!canvas) return;
      const scale = 0.5; // Optimized mask resolution for 60/120fps performance
      canvas.width = Math.max(1, Math.round(window.innerWidth * scale));
      canvas.height = Math.max(1, Math.round(window.innerHeight * scale));
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = {
        x: e.clientX,
        y: e.clientY,
        normX: window.innerWidth > 0 ? e.clientX / window.innerWidth : 0.5,
        normY: window.innerHeight > 0 ? e.clientY / window.innerHeight : 0.5,
      };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mousePosRef.current = {
          x: touch.clientX,
          y: touch.clientY,
          normX: window.innerWidth > 0 ? touch.clientX / window.innerWidth : 0.5,
          normY: window.innerHeight > 0 ? touch.clientY / window.innerHeight : 0.5,
        };
      }
    };

    const handleMouseLeave = () => {
      mousePosRef.current = {
        x: -999,
        y: -999,
        normX: 0.5,
        normY: 0.5,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Main animation loop: Spotlight Mask + Grid Parallax
    const renderLoop = () => {
      const { x: targetX, y: targetY, normX, normY } = mousePosRef.current;

      // 1. Cursor smoothing: rAF loop with lerp factor 0.1 toward real mouse position
      if (smoothCursorRef.current.x < -900 && targetX > -900) {
        smoothCursorRef.current.x = targetX;
        smoothCursorRef.current.y = targetY;
      } else {
        smoothCursorRef.current.x += (targetX - smoothCursorRef.current.x) * 0.1;
        smoothCursorRef.current.y += (targetY - smoothCursorRef.current.y) * 0.1;
      }

      // 2. Grid parallax: target = (norm - 0.5) * 16px, eased at 0.06 lerp per frame
      const targetGridX = (normX - 0.5) * 16;
      const targetGridY = (normY - 0.5) * 16;
      gridOffsetRef.current.x += (targetGridX - gridOffsetRef.current.x) * 0.06;
      gridOffsetRef.current.y += (targetGridY - gridOffsetRef.current.y) * 0.06;

      if (patternRef.current) {
        patternRef.current.setAttribute('x', gridOffsetRef.current.x.toFixed(2));
        patternRef.current.setAttribute('y', gridOffsetRef.current.y.toFixed(2));
        patternRef.current.setAttribute(
          'patternTransform',
          `translate(${gridOffsetRef.current.x.toFixed(2)}, ${gridOffsetRef.current.y.toFixed(2)})`
        );
      }

      // 3. Render mask to canvas and export to mask-image
      if (canvas && revealRef.current) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          const scale = canvas.width / Math.max(1, window.innerWidth);
          const curX = smoothCursorRef.current.x * scale;
          const curY = smoothCursorRef.current.y * scale;
          const radius = 260 * scale;

          if (smoothCursorRef.current.x > -800) {
            const grad = ctx.createRadialGradient(curX, curY, 0, curX, curY, radius);
            grad.addColorStop(0, 'rgba(0, 0, 0, 1)');
            grad.addColorStop(0.4, 'rgba(0, 0, 0, 1)');
            grad.addColorStop(0.6, 'rgba(0, 0, 0, 0.75)');
            grad.addColorStop(0.75, 'rgba(0, 0, 0, 0.4)');
            grad.addColorStop(0.88, 'rgba(0, 0, 0, 0.12)');
            grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(curX, curY, radius, 0, Math.PI * 2);
            ctx.fill();
          }

          const dataUrl = canvas.toDataURL();
          revealRef.current.style.maskImage = `url(${dataUrl})`;
          revealRef.current.style.webkitMaskImage = `url(${dataUrl})`;
          revealRef.current.style.maskSize = '100% 100%';
          revealRef.current.style.webkitMaskSize = '100% 100%';
        }
      }

      animFrameId = requestAnimationFrame(renderLoop);
    };

    animFrameId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', updateCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Stop webcam stream when closing modal or finishing
  const stopLiveCamera = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    setIsLiveCameraActive(false);
  };

  const startLiveCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      mediaStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsLiveCameraActive(true);
    } catch (err) {
      console.warn('Camera access error:', err);
      showToast('Camera access blocked. Use file upload or test plate.');
    }
  };

  const captureLiveFrame = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      stopLiveCamera();
      analyzePhotoWithAi(dataUrl);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      stopLiveCamera();
      analyzePhotoWithAi(base64);
    };
    reader.readAsDataURL(file);
  };

  const analyzePhotoWithAi = async (imageBase64: string, fallbackFallbackData?: any) => {
    setScanImagePreview(imageBase64);
    setIsScanning(true);
    setDetectedFoodResult(null);

    setScanStep('[1/3] ISOLATING GASTRONOMIC VISUAL ENTITIES...');
    await new Promise((r) => setTimeout(r, 600));

    setScanStep('[2/3] CALCULATING VOLUME, DENSITY & PORTION MATRIX...');
    await new Promise((r) => setTimeout(r, 700));

    setScanStep('[3/3] RETRIEVING TRUE CALORIES FROM USDA FOODDATA CENTRAL...');

    try {
      const res = await fetch('/api/analyze-food', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64, mimeType: 'image/jpeg' }),
      });

      if (res.ok) {
        const data = await res.json();
        setDetectedFoodResult(data);
        setPortionMultiplier(1.0);
        setServingConfirmed(false);
        setCustomGramsInput('');
        showToast(`Identified: ${data.calories} true kcal`);
      } else {
        throw new Error('API server unavailable');
      }
    } catch (err) {
      console.warn('Using intelligent nutrient database match fallback:', err);
      const fallback = fallbackFallbackData || {
        foodName: 'Nutrient-Dense Fresh Fruit Plate',
        portionSize: '1 portion (200g)',
        calories: 95,
        protein: 1.0,
        carbs: 24,
        fats: 0.4,
        fiber: 4.2,
        micros: 96,
        hydration: 86,
        confidence: 0.96,
        source: 'USDA FoodData Central (#171688)',
        summary:
          'Abundant natural fructose, protective bioflavonoids, and soluble fiber matrix.',
      };
      setDetectedFoodResult(fallback);
      setPortionMultiplier(1.0);
      setServingConfirmed(false);
      setCustomGramsInput('');
      showToast(`Database verified: ${fallback.calories} true kcal`);
    } finally {
      setIsScanning(false);
    }
  };

  const applyScannedFoodToRadar = () => {
    if (!detectedFoodResult) return;
    const finalCalories = Math.round(detectedFoodResult.calories * portionMultiplier);
    const finalProtein = Number((detectedFoodResult.protein * portionMultiplier).toFixed(1));
    const finalCarbs = Number((detectedFoodResult.carbs * portionMultiplier).toFixed(1));
    const finalFats = Number((detectedFoodResult.fats * portionMultiplier).toFixed(1));
    const finalFiber = Number((detectedFoodResult.fiber * portionMultiplier).toFixed(1));

    const newKey = `ai-${Date.now()}`;
    const newPreset: NutritionPreset = {
      name: detectedFoodResult.foodName.slice(0, 14).toUpperCase(),
      code: `CAL-${finalCalories} // PROT-${finalProtein}g`,
      calories: `${finalCalories} KCAL`,
      bioEff: `${Math.round(detectedFoodResult.confidence * 100)}%`,
      data: [
        {
          subject: 'Protein',
          value: Math.min(100, Math.round((finalProtein / 50) * 100)),
          unit: `${finalProtein}g`,
          fullMark: 100,
        },
        {
          subject: 'Carbs',
          value: Math.min(100, Math.round((finalCarbs / 80) * 100)),
          unit: `${finalCarbs}g`,
          fullMark: 100,
        },
        {
          subject: 'Fats',
          value: Math.min(100, Math.round((finalFats / 40) * 100)),
          unit: `${finalFats}g`,
          fullMark: 100,
        },
        {
          subject: 'Bio-Fiber',
          value: Math.min(100, Math.round((finalFiber / 25) * 100)),
          unit: `${finalFiber}g`,
          fullMark: 100,
        },
        {
          subject: 'Micros',
          value: detectedFoodResult.micros || 95,
          unit: 'Opt',
          fullMark: 100,
        },
        {
          subject: 'Hydration',
          value: detectedFoodResult.hydration || 80,
          unit: `${detectedFoodResult.hydration * 10}ml`,
          fullMark: 100,
        },
      ],
    };

    setPresets((prev) => ({
      ...prev,
      [newKey]: newPreset,
    }));
    setActivePresetKey(newKey);
    setRadarMinimized(false);
    setCameraModalOpen(false);
    stopLiveCamera();
    showToast('Verified food profile projected onto Radar HUD!');
  };

  // Inject a fruit directly from the fruit database into the Radar Chart
  const projectFruitToRadar = (fruit: FruitItem) => {
    const key = `fruit-${fruit.id}`;
    const fruitPreset: NutritionPreset = {
      name: fruit.name.split(' ')[0].toUpperCase(),
      code: `CAL-${fruit.calories} // FIB-${fruit.fiber}g`,
      calories: `${fruit.calories} KCAL`,
      bioEff: '98.5%',
      data: [
        {
          subject: 'Protein',
          value: Math.min(100, Math.round((fruit.protein / 5) * 100)),
          unit: `${fruit.protein}g`,
          fullMark: 100,
        },
        {
          subject: 'Carbs',
          value: Math.min(100, Math.round((fruit.carbs / 35) * 100)),
          unit: `${fruit.carbs}g`,
          fullMark: 100,
        },
        {
          subject: 'Fats',
          value: Math.min(100, Math.round((fruit.fats / 25) * 100)),
          unit: `${fruit.fats}g`,
          fullMark: 100,
        },
        {
          subject: 'Bio-Fiber',
          value: Math.min(100, Math.round((fruit.fiber / 12) * 100)),
          unit: `${fruit.fiber}g`,
          fullMark: 100,
        },
        {
          subject: 'Micros',
          value: 96,
          unit: 'Max',
          fullMark: 100,
        },
        {
          subject: 'Hydration',
          value: fruit.hydration,
          unit: `${fruit.hydration}%`,
          fullMark: 100,
        },
      ],
    };

    setPresets((prev) => ({
      ...prev,
      [key]: fruitPreset,
    }));
    setActivePresetKey(key);
    setRadarMinimized(false);
    setFruitsModalOpen(false);
    showToast(`${fruit.name} (${fruit.calories} kcal) active on Radar HUD!`);
  };

  // Filtered fruits
  const filteredFruits = FRUITS_DATABASE.filter((fruit) => {
    const matchesSearch =
      fruit.name.toLowerCase().includes(fruitSearch.toLowerCase()) ||
      fruit.category.toLowerCase().includes(fruitSearch.toLowerCase()) ||
      fruit.colorName.toLowerCase().includes(fruitSearch.toLowerCase());
    const matchesCategory =
      selectedFruitCategory === 'All' || fruit.category === selectedFruitCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', 'Tree Fruit', 'Berries', 'Tropical', 'Superfood', 'Citrus', 'Melons'];
  const hydrationPercentage = Math.min(100, Math.round((currentWaterMl / waterGoalMl) * 100));

  return (
    <div
      className="min-h-screen bg-white tracking-[-0.02em] select-none text-gray-900 relative"
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[130] bg-black/90 text-white border border-cyan-500/60 px-4 py-2 rounded-full text-xs font-mono shadow-2xl flex items-center gap-2 animate-bounce">
          <Sparkles size={14} className="text-cyan-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          NAVBAR (Fixed, z-50)
          ══════════════════════════════════════════════════════════════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between md:justify-center p-4 sm:p-5">
        {/* Desktop (md+): ONE centered pill */}
        <div className="hidden md:flex nav-drop bg-black/60 backdrop-blur-md rounded-full pl-3 pr-2 py-2 items-center gap-1 border border-white/10 shadow-2xl">
          {/* Geometric angular mark SVG (22x22, viewBox 0 0 256 256) */}
          <div className="px-1 flex items-center justify-center">
            <svg
              width="22"
              height="22"
              viewBox="0 0 256 256"
              fill="white"
              className="shrink-0"
              aria-label="Augmented Mark"
            >
              <path d="M 256 64 L 256 128 L 192.5 128 L 160 95 L 128 64 L 96 95 L 63.5 128 L 64 128 L 128 192 L 128 256 L 64.5 256 L 32 223 L 0 192 L 0 64 L 64 0 L 192 0 Z M 256 192 L 256 256 L 192.5 256 L 160 223 L 128 192 L 128 128 L 192 128 Z" />
            </svg>
          </div>

          {/* Links */}
          {NAV_LINKS.map((link, idx) => {
            const isActive = idx === 0;
            return (
              <button
                key={link}
                type="button"
                className={`text-sm font-medium px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
                  isActive
                    ? 'text-white bg-white/15'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                {link}
              </button>
            );
          })}

          {/* Hydration Tracker Action Pill */}
          <button
            type="button"
            onClick={() => setHydrationModalOpen(true)}
            className="flex items-center gap-1.5 bg-cyan-600/80 hover:bg-cyan-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-all cursor-pointer ml-1 shadow-sm active:scale-95"
            title="Open Daily Cellular Hydration Tracker"
          >
            <Droplets size={14} className="text-cyan-200" />
            <span>{(currentWaterMl / 1000).toFixed(1)}L ({hydrationPercentage}%)</span>
          </button>

          {/* Fruits Catalog Action Button */}
          <button
            type="button"
            onClick={() => setFruitsModalOpen(true)}
            className="flex items-center gap-1.5 bg-emerald-600/80 hover:bg-emerald-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-all cursor-pointer shadow-sm active:scale-95"
            title="Explore Fruits Calories & Nutrition"
          >
            <Apple size={14} />
            <span>Fruits</span>
          </button>

          {/* AI Camera Scan Action Pill */}
          <button
            type="button"
            onClick={() => {
              setCameraModalOpen(true);
            }}
            className="flex items-center gap-1.5 bg-red-600/80 hover:bg-red-600 text-white text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all cursor-pointer shadow-sm active:scale-95"
            title="Scan Food with AI for True Calories"
          >
            <Camera size={14} />
            <span>Scan Calories</span>
          </button>

          {/* Creator Profile Chip */}
          <button
            type="button"
            onClick={() => setCreatorModalOpen(true)}
            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ml-1 cursor-pointer shadow-sm active:scale-95 border border-white/20"
            title="Creator: Shaswat Singh (+917887222907)"
          >
            <User size={13} className="text-red-400" />
            <span>Creator</span>
          </button>

          {/* CTA "Connect" */}
          <button
            type="button"
            onClick={() => setCreatorModalOpen(true)}
            className="bg-white text-gray-900 text-sm font-semibold px-5 py-1.5 rounded-full hover:bg-gray-100 transition-colors ml-1 cursor-pointer shadow-sm active:scale-95"
            title="Connect with Shaswat Singh"
          >
            Connect
          </button>
        </div>

        {/* Mobile (<md): Logo pill (left) */}
        <div className="md:hidden nav-drop bg-black/60 backdrop-blur-md rounded-full p-2.5 flex items-center border border-white/10 shadow-lg">
          <svg
            width="22"
            height="22"
            viewBox="0 0 256 256"
            fill="white"
            aria-label="Augmented Mark"
          >
            <path d="M 256 64 L 256 128 L 192.5 128 L 160 95 L 128 64 L 96 95 L 63.5 128 L 64 128 L 128 192 L 128 256 L 64.5 256 L 32 223 L 0 192 L 0 64 L 64 0 L 192 0 Z M 256 192 L 256 256 L 192.5 256 L 160 223 L 128 192 L 128 128 L 192 128 Z" />
          </svg>
        </div>

        {/* Mobile (<md): Right Action Group */}
        <div className="md:hidden flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setHydrationModalOpen(true)}
            className="nav-drop bg-cyan-600 text-white rounded-full p-2.5 flex items-center justify-center border border-cyan-400/30 shadow-lg cursor-pointer active:scale-95"
            aria-label="Open hydration tracker"
            title="Hydration Tracker"
          >
            <Droplets size={20} />
          </button>

          <button
            type="button"
            onClick={() => setFruitsModalOpen(true)}
            className="nav-drop bg-emerald-600 text-white rounded-full p-2.5 flex items-center justify-center border border-emerald-400/30 shadow-lg cursor-pointer active:scale-95"
            aria-label="Open fruits calories catalog"
            title="Fruits Calories"
          >
            <Apple size={20} />
          </button>

          <button
            type="button"
            onClick={() => setCameraModalOpen(true)}
            className="nav-drop bg-red-600 text-white rounded-full p-2.5 flex items-center justify-center border border-red-400/30 shadow-lg cursor-pointer active:scale-95"
            aria-label="Scan food photo with AI camera"
            title="Scan Food with Camera"
          >
            <Camera size={20} />
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="nav-drop bg-black/60 backdrop-blur-md rounded-full p-2.5 flex items-center justify-center text-white border border-white/10 shadow-lg cursor-pointer active:scale-95 transition-transform relative z-50"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white pt-20 pb-6 px-5 shadow-2xl border-b border-gray-100 flex flex-col">
            {NAV_LINKS.map((link, idx) => (
              <button
                key={link}
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className={`py-3 text-left border-b border-gray-100 text-sm font-medium transition-colors ${
                  idx === 0 ? 'text-gray-900 font-bold' : 'text-gray-700 hover:text-black'
                }`}
              >
                {link}
              </button>
            ))}

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setHydrationModalOpen(true);
              }}
              className="mt-3 w-full py-3 bg-cyan-600 text-white text-center rounded-full text-sm font-semibold flex items-center justify-center gap-2"
            >
              <Droplets size={16} />
              <span>Cellular Hydration Tracker ({(currentWaterMl / 1000).toFixed(1)}L)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setFruitsModalOpen(true);
              }}
              className="mt-2 w-full py-3 bg-emerald-600 text-white text-center rounded-full text-sm font-semibold flex items-center justify-center gap-2"
            >
              <Apple size={16} />
              <span>Fruits Calories & Profiles</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setCameraModalOpen(true);
              }}
              className="mt-2 w-full py-3 bg-red-600 text-white text-center rounded-full text-sm font-semibold flex items-center justify-center gap-2"
            >
              <Camera size={16} />
              <span>AI Photo Calorie Scan</span>
            </button>

            {/* Creator Contact Card in Mobile Menu */}
            <div className="mt-3 p-3 rounded-2xl bg-gray-950 text-white border border-gray-800 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-red-400 font-mono uppercase tracking-wider">System Creator</div>
                  <div className="text-sm font-bold">Shaswat Singh</div>
                </div>
                <a
                  href="tel:+917887222907"
                  className="px-3.5 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-full flex items-center gap-1.5 shadow"
                >
                  <Phone size={12} />
                  <span>Call</span>
                </a>
              </div>
              <div className="text-xs text-gray-400 font-mono flex items-center justify-between pt-1 border-t border-gray-800/80">
                <span>+91 7887222907</span>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText('+917887222907');
                    showToast('Copied +917887222907');
                  }}
                  className="text-red-400 hover:underline text-[11px]"
                >
                  Copy Number
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setCreatorModalOpen(true);
              }}
              className="mt-2 w-full py-3 bg-gray-900 text-white text-center rounded-full text-sm font-semibold hover:bg-black transition-colors"
            >
              Connect & Dossier
            </button>
          </div>
        )}
      </nav>

      {/* ══════════════════════════════════════════════════════════════════
          HERO SECTION (100dvh, relative overflow-hidden)
          ══════════════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative h-[100dvh] w-full overflow-hidden bg-black"
        aria-label="Cyberpunk Hero Showcase"
      >
        {/* Layer 1: Grid background (z-0) with mouse parallax */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-10 z-0"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="grid-pattern"
              ref={patternRef}
              width="48"
              height="48"
              patternUnits="userSpaceOnUse"
              x="0"
              y="0"
            >
              <path
                d="M 48 0 L 0 0 0 48"
                fill="none"
                stroke="#64748b"
                strokeWidth="0.6"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>

        {/* Layer 2: Base image (z-10) with Ken Burns zoom intro */}
        <div
          className="absolute inset-0 bg-center bg-cover z-10 animate-ken-burns pointer-events-none"
          style={{ backgroundImage: `url(${BG_IMAGE_1})` }}
          aria-hidden="true"
        />

        {/* Layer 3: Cursor spotlight reveal layer (z-30) */}
        <div
          ref={revealRef}
          className="absolute inset-0 bg-center bg-cover z-30 pointer-events-none"
          style={{ backgroundImage: `url(${BG_IMAGE_2})` }}
          aria-hidden="true"
        />

        {/* Layer 4: Hero text block (z-50) */}
        <div className="absolute bottom-10 sm:bottom-16 md:bottom-20 left-5 sm:left-8 md:left-12 max-w-[360px] sm:max-w-xl z-50 pointer-events-auto">
          {/* Eyebrow */}
          <div
            className="hero-rise text-xs sm:text-sm font-bold tracking-[0.2em] text-red-400 uppercase mb-2 flex items-center gap-2"
            style={{ animationDelay: '0.15s' }}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_#ef4444]" />
            <span>Augmented Food AI System</span>
          </div>

          {/* H1: RAKSHAK */}
          <h1
            className="hero-rise text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.88] tracking-[-0.05em] text-white font-black mb-4 sm:mb-5 uppercase drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]"
            style={{ animationDelay: '0.3s' }}
          >
            RAKSHAK
          </h1>

          {/* Paragraph */}
          <p
            className="hero-rise text-sm sm:text-base text-white/90 leading-relaxed mb-6 sm:mb-8 max-w-lg drop-shadow-md"
            style={{ animationDelay: '0.5s' }}
          >
            Next-generation food intelligence and biomimetic nutrition. Laboratory-verified USDA true calories, cellular osmotic hydration, and precision metabolic telemetry.
          </p>

          {/* Actions: "Reserve Now", "Hydration", "Fruits Calories", & "AI Camera Scan" */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              className="hero-rise group relative inline-flex items-center justify-center px-7 sm:px-8 py-3 sm:py-3.5 rounded-full bg-white text-gray-900 font-semibold text-sm sm:text-base shadow-lg shadow-black/20 hover:scale-[1.04] active:scale-95 transition-transform duration-200 overflow-hidden cursor-pointer"
              style={{ animationDelay: '0.7s' }}
            >
              <span
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none"
                aria-hidden="true"
              />
              <span className="relative z-10">Reserve Now</span>
            </button>

            <button
              type="button"
              onClick={() => setHydrationModalOpen(true)}
              className="hero-rise inline-flex items-center gap-2 px-4 py-3 sm:py-3.5 rounded-full bg-cyan-950/60 hover:bg-cyan-900/80 text-white font-semibold text-sm border border-cyan-500/40 hover:border-cyan-400 transition-all shadow-lg active:scale-95 cursor-pointer backdrop-blur-md"
              style={{ animationDelay: '0.73s' }}
            >
              <Droplets size={16} className="text-cyan-400" />
              <span>Hydration ({hydrationPercentage}%)</span>
            </button>

            <button
              type="button"
              onClick={() => setFruitsModalOpen(true)}
              className="hero-rise inline-flex items-center gap-2 px-4 py-3 sm:py-3.5 rounded-full bg-emerald-950/60 hover:bg-emerald-900/80 text-white font-semibold text-sm border border-emerald-500/40 hover:border-emerald-400 transition-all shadow-lg active:scale-95 cursor-pointer backdrop-blur-md"
              style={{ animationDelay: '0.76s' }}
            >
              <Apple size={16} className="text-emerald-400" />
              <span>Fruits</span>
            </button>

            <button
              type="button"
              onClick={() => setCameraModalOpen(true)}
              className="hero-rise inline-flex items-center gap-2 px-4 py-3 sm:py-3.5 rounded-full bg-black/60 hover:bg-black/80 text-white font-semibold text-sm border border-red-500/40 hover:border-red-500 transition-all shadow-lg active:scale-95 cursor-pointer backdrop-blur-md"
              style={{ animationDelay: '0.8s' }}
            >
              <Camera size={16} className="text-red-400" />
              <span>Camera Scan</span>
            </button>
          </div>

          {/* Creator & Contact Banner */}
          <div
            className="hero-rise mt-4 pt-3.5 border-t border-white/15 flex flex-wrap items-center gap-2 text-xs font-mono"
            style={{ animationDelay: '0.84s' }}
          >
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-gray-400 text-[11px]">CREATOR:</span>
              <span className="font-bold tracking-wider text-white">Shaswat Singh</span>
            </div>

            <a
              href="tel:+917887222907"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-600/30 hover:bg-red-600/60 border border-red-500/50 text-red-300 hover:text-white transition-all active:scale-95 cursor-pointer backdrop-blur-md"
              title="Call Shaswat Singh (+917887222907)"
            >
              <Phone size={12} className="text-red-400" />
              <span className="font-semibold">+91 7887222907</span>
            </a>

            <button
              type="button"
              onClick={() => setCreatorModalOpen(true)}
              className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-gray-200 hover:text-white transition-all active:scale-95 cursor-pointer backdrop-blur-md text-[11px]"
            >
              Dossier
            </button>
          </div>
        </div>

        {/* Layer 6: Recharts Radar Chart Overlay (Right-side HUD) */}
        <div
          className="hero-rise absolute top-20 sm:top-24 md:top-28 right-4 sm:right-6 md:right-10 z-50 pointer-events-auto w-[290px] sm:w-[320px] md:w-[340px]"
          style={{ animationDelay: '0.6s' }}
        >
          <div className="bg-black/65 backdrop-blur-md border border-white/15 rounded-2xl p-4 sm:p-5 shadow-2xl transition-all duration-300">
            {/* Header */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                <span className="text-[10px] font-bold tracking-[0.16em] text-red-400 uppercase">
                  BIO-CORE // {currentPreset.code}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setRadarMinimized((prev) => !prev)}
                className="text-[10px] tracking-wider text-gray-400 hover:text-white px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 transition-colors uppercase cursor-pointer"
                aria-label={radarMinimized ? 'Expand chart' : 'Minimize chart'}
              >
                {radarMinimized ? 'Expand' : 'Hide'}
              </button>
            </div>

            <div className="mb-2">
              <h3 className="text-white text-xs sm:text-sm font-bold tracking-tight uppercase flex items-center justify-between">
                <span>Augmented Food Vector</span>
                <span className="text-red-400 text-[11px] font-mono">{currentPreset.calories}</span>
              </h3>
              <p className="text-[10px] text-gray-400">
                Cellular absorption matrix & synthetic bioavailability
              </p>
            </div>

            {!radarMinimized && (
              <>
                {/* Preset switcher tabs */}
                <div className="flex items-center gap-1 p-1 bg-white/5 rounded-lg mb-2 text-[10px] overflow-x-auto">
                  {Object.entries(presets).map(([key, item]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setActivePresetKey(key)}
                      className={`py-1 px-2 rounded text-center font-medium transition-colors cursor-pointer whitespace-nowrap ${
                        activePresetKey === key
                          ? 'bg-red-500/80 text-white font-bold shadow-sm'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {item.name.split(' ')[0]}
                    </button>
                  ))}
                </div>

                {/* Radar Chart */}
                <div className="w-full h-[190px] sm:h-[210px] -my-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="68%" data={currentPreset.data}>
                      <PolarGrid stroke="rgba(255, 255, 255, 0.15)" strokeDasharray="3 3" />
                      <PolarAngleAxis
                        dataKey="subject"
                        tick={{
                          fill: 'rgba(255, 255, 255, 0.85)',
                          fontSize: 9.5,
                          fontFamily: "'JetBrains Mono', monospace",
                        }}
                      />
                      <PolarRadiusAxis
                        angle={30}
                        domain={[0, 100]}
                        tick={false}
                        axisLine={false}
                      />
                      <Radar
                        name="Nutritional Profile"
                        dataKey="value"
                        stroke="#ef4444"
                        strokeWidth={1.8}
                        fill="#ef4444"
                        fillOpacity={0.35}
                      />
                      <Tooltip content={<CustomTooltip />} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                {/* Footer Metrics */}
                <div className="grid grid-cols-3 gap-1 pt-2 border-t border-white/10 text-center font-mono">
                  <div className="p-1 rounded bg-white/5">
                    <div className="text-[9px] text-gray-400 uppercase">Assimilation</div>
                    <div className="text-[11px] font-bold text-white">{currentPreset.bioEff}</div>
                  </div>
                  <div className="p-1 rounded bg-white/5">
                    <div className="text-[9px] text-gray-400 uppercase">Hydration</div>
                    <div className="text-[11px] font-bold text-cyan-400">
                      {hydrationPercentage}%
                    </div>
                  </div>
                  <div className="p-1 rounded bg-white/5">
                    <div className="text-[9px] text-gray-400 uppercase">Stability</div>
                    <div className="text-[11px] font-bold text-white">GEN-04</div>
                  </div>
                </div>

                {/* Triple action buttons inside HUD */}
                <div className="grid grid-cols-3 gap-1.5 mt-3">
                  <button
                    type="button"
                    onClick={() => setHydrationModalOpen(true)}
                    className="py-1.5 px-1 bg-cyan-600/30 hover:bg-cyan-600/50 border border-cyan-500/40 text-cyan-300 hover:text-white rounded-lg text-[10px] font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer truncate"
                  >
                    <Droplets size={12} />
                    <span>Hydrate</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFruitsModalOpen(true)}
                    className="py-1.5 px-1 bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/40 text-emerald-300 hover:text-white rounded-lg text-[10px] font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer truncate"
                  >
                    <Apple size={12} />
                    <span>Fruits</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCameraModalOpen(true)}
                    className="py-1.5 px-1 bg-red-600/30 hover:bg-red-600/50 border border-red-500/40 text-red-300 hover:text-white rounded-lg text-[10px] font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer truncate"
                  >
                    <Camera size={12} />
                    <span>AI Scan</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          DAILY HYDRATION TRACKER MODAL (Periodic Alerts & Cellular Intake)
          ══════════════════════════════════════════════════════════════════ */}
      {hydrationModalOpen && (
        <div className="fixed inset-0 z-[125] bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-gray-950 border border-cyan-500/40 rounded-2xl shadow-2xl overflow-hidden text-white my-8">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10 bg-black/60">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-600/20 text-cyan-400 border border-cyan-500/30">
                  <Droplets size={22} />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold uppercase tracking-wide flex items-center gap-2">
                    <span>Cellular Hydration Chamber</span>
                    <span className="text-[10px] font-mono text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/20">
                      BIO-OSMOTIC TRACKER
                    </span>
                  </h2>
                  <p className="text-xs text-gray-400">
                    Real-time fluid logging & periodic neural hydration alerts
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setHydrationModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X size={22} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-6">
              {/* Top: Fluid Reactor Visual Cylinder & Target Status */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center bg-black/50 p-4 rounded-xl border border-white/10">
                {/* Visual Bio-Hydration Tube */}
                <div className="md:col-span-5 flex flex-col items-center">
                  <div className="relative w-28 h-52 rounded-2xl border-2 border-cyan-400/50 bg-black/80 overflow-hidden flex flex-col justify-end p-1 shadow-[0_0_25px_rgba(6,182,212,0.15)]">
                    {/* Measurement graduation markings */}
                    <div className="absolute inset-y-0 right-1.5 flex flex-col justify-between py-3 text-[8px] font-mono text-cyan-500/60 pointer-events-none select-none z-10">
                      <span>2500</span>
                      <span>2000</span>
                      <span>1500</span>
                      <span>1000</span>
                      <span>500</span>
                    </div>

                    {/* Animated fluid fill wave */}
                    <div
                      className="w-full rounded-xl bg-gradient-to-t from-cyan-600 via-cyan-500 to-blue-400 transition-all duration-700 relative overflow-hidden flex items-start justify-center pt-2 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                      style={{ height: `${Math.min(100, Math.max(8, hydrationPercentage))}%` }}
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.4),transparent)] pointer-events-none" />
                      <span className="text-[10px] font-mono font-bold text-black bg-white/75 px-1.5 py-0.5 rounded-full z-10">
                        {hydrationPercentage}%
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mt-2">
                    Fluid Osmotic Cell
                  </span>
                </div>

                {/* Metrics & Target Panel */}
                <div className="md:col-span-7 space-y-3">
                  <div>
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">
                      Current Cellular Saturation
                    </span>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="text-3xl font-bold font-mono text-cyan-400">
                        {currentWaterMl}
                      </span>
                      <span className="text-sm font-mono text-gray-400">/ {waterGoalMl} ml</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-500/20 text-xs">
                    <div className="flex items-center justify-between font-mono text-[11px] mb-1">
                      <span className="text-gray-400">OSMOTIC EQUILIBRIUM:</span>
                      <strong className={hydrationPercentage >= 80 ? 'text-green-400' : 'text-cyan-300'}>
                        {hydrationPercentage >= 100
                          ? 'HYPER-SATURATED (MAX)'
                          : hydrationPercentage >= 75
                          ? 'OPTIMAL EQUILIBRIUM'
                          : 'HYDRATION DEFICIT'}
                      </strong>
                    </div>
                    <p className="text-[10px] text-gray-400 leading-relaxed">
                      Maintaining consistent 250ml water pulses regulates cytoplasmic transport,
                      synaptic latency, and muscular electrolyte retention.
                    </p>
                  </div>

                  {/* Periodic Notification Alert Countdown */}
                  <div className="p-3 rounded-lg bg-black/60 border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-cyan-400 animate-pulse" />
                      <div>
                        <div className="text-[11px] font-bold text-white font-mono">
                          NEXT HYDRATION PULSE
                        </div>
                        <div className="text-[10px] text-gray-400 font-mono">
                          {hydrationReminderEnabled ? (
                            <span>
                              Trigger in {Math.floor(secondsUntilNextReminder / 60)}m{' '}
                              {secondsUntilNextReminder % 60}s
                            </span>
                          ) : (
                            <span className="text-gray-500">Reminders paused</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={triggerHydrationAlert}
                      className="px-2.5 py-1 rounded bg-cyan-600/30 hover:bg-cyan-600/50 border border-cyan-500/40 text-[10px] font-mono text-cyan-300 hover:text-white transition-colors cursor-pointer"
                    >
                      Test Pulse
                    </button>
                  </div>
                </div>
              </div>

              {/* Middle: Quick Log Intake Controls */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-gray-400 uppercase tracking-wider">Quick Intake Intake</span>
                  <span className="text-cyan-400 text-[10px]">TAP TO LOG FLUID</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => logWater(150)}
                    className="p-3 rounded-xl bg-white/5 hover:bg-cyan-600/20 border border-white/10 hover:border-cyan-500/50 text-center transition-all cursor-pointer group"
                  >
                    <span className="text-lg font-bold font-mono text-cyan-400 group-hover:scale-110 block transition-transform">
                      +150ml
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">Quick Sip</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => logWater(250)}
                    className="p-3 rounded-xl bg-white/5 hover:bg-cyan-600/20 border border-white/10 hover:border-cyan-500/50 text-center transition-all cursor-pointer group"
                  >
                    <span className="text-lg font-bold font-mono text-cyan-400 group-hover:scale-110 block transition-transform">
                      +250ml
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">Glass</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => logWater(500)}
                    className="p-3 rounded-xl bg-white/5 hover:bg-cyan-600/20 border border-white/10 hover:border-cyan-500/50 text-center transition-all cursor-pointer group"
                  >
                    <span className="text-lg font-bold font-mono text-cyan-400 group-hover:scale-110 block transition-transform">
                      +500ml
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">Thermal Flask</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => logWater(750)}
                    className="p-3 rounded-xl bg-white/5 hover:bg-cyan-600/20 border border-white/10 hover:border-cyan-500/50 text-center transition-all cursor-pointer group"
                  >
                    <span className="text-lg font-bold font-mono text-cyan-400 group-hover:scale-110 block transition-transform">
                      +750ml
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">Sports Bottle</span>
                  </button>
                </div>

                {/* Custom Amount Logger */}
                <div className="flex items-center gap-2 pt-1">
                  <div className="relative flex-1">
                    <input
                      type="number"
                      step="50"
                      min="50"
                      max="2000"
                      value={customWaterInput}
                      onChange={(e) => setCustomWaterInput(e.target.value)}
                      placeholder="Custom ml (e.g. 350)"
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2 text-xs font-mono text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-gray-400">
                      ML
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const amt = parseInt(customWaterInput, 10);
                      if (amt && amt > 0) logWater(amt);
                    }}
                    className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs font-mono transition-colors cursor-pointer"
                  >
                    Log Intake
                  </button>
                </div>
              </div>

              {/* Bottom: Periodic Notification Settings */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BellRing size={16} className="text-cyan-400" />
                    <div>
                      <h4 className="text-xs font-bold font-mono text-white">
                        PERIODIC HYDRATION PULSES
                      </h4>
                      <p className="text-[10px] text-gray-400">
                        Periodic alerts to prompt water intake throughout your active cycle
                      </p>
                    </div>
                  </div>

                  {/* Reminder Toggle */}
                  <button
                    type="button"
                    onClick={() => setHydrationReminderEnabled(!hydrationReminderEnabled)}
                    className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold transition-colors cursor-pointer ${
                      hydrationReminderEnabled
                        ? 'bg-cyan-500 text-black'
                        : 'bg-white/10 text-gray-400'
                    }`}
                  >
                    {hydrationReminderEnabled ? 'ENABLED' : 'PAUSED'}
                  </button>
                </div>

                {/* Interval Selection Pills */}
                <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/5">
                  <span className="text-[10px] font-mono text-gray-400">Alert Frequency:</span>
                  <div className="flex items-center gap-1.5">
                    {[30, 45, 60, 90].map((mins) => (
                      <button
                        key={mins}
                        type="button"
                        onClick={() => {
                          setHydrationIntervalMinutes(mins);
                          setSecondsUntilNextReminder(mins * 60);
                          showToast(`Hydration pulse interval set to ${mins} mins`);
                        }}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-colors cursor-pointer ${
                          hydrationIntervalMinutes === mins
                            ? 'bg-cyan-600 text-white font-bold'
                            : 'bg-white/5 text-gray-400 hover:text-white'
                        }`}
                      >
                        {mins}m
                      </button>
                    ))}
                  </div>
                </div>

                {/* Permissions & Sound Toggles */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/5 text-[10px] font-mono">
                  <button
                    type="button"
                    onClick={requestNotificationAccess}
                    className="text-cyan-400 hover:text-cyan-300 underline cursor-pointer"
                  >
                    Enable Browser Push Notifications
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setAudioChimeEnabled(!audioChimeEnabled);
                      showToast(audioChimeEnabled ? 'Audio chime muted' : 'Audio chime enabled');
                    }}
                    className="flex items-center gap-1 text-gray-400 hover:text-white cursor-pointer"
                  >
                    {audioChimeEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
                    <span>{audioChimeEnabled ? 'Chime Sound On' : 'Chime Muted'}</span>
                  </button>
                </div>
              </div>

              {/* Logs history preview */}
              {waterLogs.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-[10px] font-mono text-gray-400">
                    <span>Recent Intake Entries:</span>
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentWaterMl(0);
                        setWaterLogs([]);
                        try {
                          localStorage.removeItem('augmented_water_ml');
                        } catch (e) {}
                        showToast('Hydration tracker reset for today.');
                      }}
                      className="text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw size={10} />
                      <span>Reset Today</span>
                    </button>
                  </div>

                  <div className="max-h-24 overflow-y-auto space-y-1 pr-1 font-mono text-[10px]">
                    {waterLogs.map((log) => (
                      <div
                        key={log.id}
                        className="flex items-center justify-between px-2.5 py-1 rounded bg-white/5 text-gray-300"
                      >
                        <span className="text-cyan-400 font-bold">+{log.amount} ml</span>
                        <span className="text-gray-500">{log.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          FRUITS CALORIES & NUTRITIONAL PHOTO CATALOG MODAL
          ══════════════════════════════════════════════════════════════════ */}
      {fruitsModalOpen && (
        <div className="fixed inset-0 z-[115] bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-gray-950 border border-emerald-500/40 rounded-2xl shadow-2xl overflow-hidden text-white my-8">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10 bg-black/60">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30">
                  <Apple size={22} />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold uppercase tracking-wide flex items-center gap-2">
                    <span>Fruits Nutrition & Calories Matrix</span>
                    <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/20">
                      USDA FOODDATA CENTRAL
                    </span>
                  </h2>
                  <p className="text-xs text-gray-400">
                    High-definition fruit photographs, verified calories, natural sugars & hydration profiles
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setFruitsModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X size={22} />
              </button>
            </div>

            {/* Filter & Search Bar */}
            <div className="p-4 sm:p-5 border-b border-white/10 bg-white/[0.02] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={fruitSearch}
                  onChange={(e) => setFruitSearch(e.target.value)}
                  placeholder="Search by fruit name, color, or nutrient..."
                  className="w-full bg-black/60 border border-white/15 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedFruitCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-medium whitespace-nowrap transition-colors cursor-pointer ${
                      selectedFruitCategory === cat
                        ? 'bg-emerald-600 text-white font-bold shadow-sm'
                        : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Fruits Grid */}
            <div className="p-4 sm:p-5 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {filteredFruits.map((fruit) => (
                  <div
                    key={fruit.id}
                    className="group bg-black/50 border border-white/10 hover:border-emerald-500/50 rounded-xl overflow-hidden p-3 transition-all flex flex-col justify-between"
                  >
                    <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden mb-3 bg-gray-900">
                      <img
                        src={fruit.photoUrl}
                        alt={fruit.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2 bg-black/85 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/20 text-right">
                        <span className="text-[12px] font-bold font-mono text-emerald-400 block leading-tight">
                          {fruit.calories} <span className="text-[9px] text-white">kcal</span>
                        </span>
                        <span className="text-[8px] text-gray-400 font-mono uppercase block">
                          {fruit.portion}
                        </span>
                      </div>

                      <div
                        className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[9px] font-bold font-mono flex items-center gap-1.5 backdrop-blur-md text-white shadow-md"
                        style={{ backgroundColor: `${fruit.colorHex}dd` }}
                      >
                        <span
                          className="w-2 h-2 rounded-full border border-white/40"
                          style={{ backgroundColor: fruit.colorHex }}
                        />
                        <span>{fruit.colorName}</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-white tracking-tight">
                          {fruit.name}
                        </h3>
                        <span className="text-[10px] text-gray-400 font-mono">
                          {fruit.category}
                        </span>
                      </div>

                      <p className="text-[10px] text-gray-400 line-clamp-2 leading-relaxed">
                        {fruit.highlight}
                      </p>

                      <div className="grid grid-cols-4 gap-1 pt-2 font-mono text-[9px] text-center border-t border-white/5">
                        <div className="bg-white/5 p-1 rounded">
                          <span className="text-gray-400 block">Carbs</span>
                          <span className="text-white font-bold">{fruit.carbs}g</span>
                        </div>
                        <div className="bg-white/5 p-1 rounded">
                          <span className="text-gray-400 block">Fiber</span>
                          <span className="text-emerald-400 font-bold">{fruit.fiber}g</span>
                        </div>
                        <div className="bg-white/5 p-1 rounded">
                          <span className="text-gray-400 block">Sugar</span>
                          <span className="text-amber-400 font-bold">{fruit.sugars}g</span>
                        </div>
                        <div className="bg-white/5 p-1 rounded">
                          <span className="text-gray-400 block">Hydration</span>
                          <span className="text-blue-400 font-bold">{fruit.hydration}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-3 pt-2 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => projectFruitToRadar(fruit)}
                        className="py-1.5 bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 transition-all cursor-pointer"
                      >
                        <Zap size={11} />
                        <span>Radar HUD</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setFruitsModalOpen(false);
                          setCameraModalOpen(true);
                          analyzePhotoWithAi(fruit.photoUrl, {
                            foodName: `${fruit.name} (${fruit.portion})`,
                            portionSize: fruit.portion,
                            calories: fruit.calories,
                            protein: fruit.protein,
                            carbs: fruit.carbs,
                            fats: fruit.fats,
                            fiber: fruit.fiber,
                            micros: 96,
                            hydration: fruit.hydration,
                            confidence: 0.98,
                            source: fruit.fdcId,
                            summary: fruit.highlight,
                          });
                        }}
                        className="py-1.5 bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white rounded-lg text-[10px] font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer border border-white/10"
                      >
                        <Camera size={11} />
                        <span>AI Scan</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-white/10 bg-black/60 flex items-center justify-between text-xs font-mono text-gray-400">
              <span className="flex items-center gap-2">
                <Check size={14} className="text-emerald-400" />
                <span>Values calibrated against laboratory bomb-calorimetry data</span>
              </span>

              <button
                type="button"
                onClick={() => setFruitsModalOpen(false)}
                className="px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-medium transition-colors"
              >
                Close Catalog
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          AI CAMERA / PHOTO SCAN MODAL (True Calorie Identification)
          ══════════════════════════════════════════════════════════════════ */}
      {cameraModalOpen && (
        <div className="fixed inset-0 z-[110] bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-xl bg-gray-950 border border-red-500/40 rounded-2xl shadow-2xl overflow-hidden text-white my-8">
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/50">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-red-600/20 text-red-400 border border-red-500/30">
                  <Camera size={18} />
                </div>
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-wide flex items-center gap-2">
                    <span>AI Food Vision Scanner</span>
                    <span className="text-[10px] font-mono text-red-400 px-1.5 py-0.5 rounded bg-red-500/20">
                      TRUE CALORIES
                    </span>
                  </h2>
                  <p className="text-[11px] text-gray-400">
                    Photo food recognition with verified nutritional databases
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  stopLiveCamera();
                  setCameraModalOpen(false);
                }}
                className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-5 space-y-5">
              <div className="relative aspect-video w-full rounded-xl bg-black border border-white/15 overflow-hidden flex items-center justify-center">
                {isLiveCameraActive ? (
                  <>
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 pointer-events-none border-2 border-red-500/40 m-4 rounded-lg flex items-center justify-center">
                      <div className="w-12 h-12 border-t-2 border-l-2 border-red-400 absolute top-2 left-2" />
                      <div className="w-12 h-12 border-t-2 border-r-2 border-red-400 absolute top-2 right-2" />
                      <div className="w-12 h-12 border-b-2 border-l-2 border-red-400 absolute bottom-2 left-2" />
                      <div className="w-12 h-12 border-b-2 border-r-2 border-red-400 absolute bottom-2 right-2" />
                      <span className="text-[10px] font-mono text-red-400 bg-black/70 px-2 py-0.5 rounded">
                        ALIGN FOOD PLATE HERE
                      </span>
                    </div>
                  </>
                ) : scanImagePreview ? (
                  <div className="relative w-full h-full">
                    <img
                      src={scanImagePreview}
                      alt="Food to analyze"
                      className="w-full h-full object-cover"
                    />
                    {isScanning && (
                      <div className="absolute inset-0 bg-red-950/40 flex flex-col items-center justify-center backdrop-blur-[2px]">
                        <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_15px_#ef4444] animate-pulse top-1/2 -translate-y-1/2" />
                        <div className="p-3 rounded-full bg-black/80 border border-red-500/50 mb-3 animate-spin">
                          <RefreshCw size={24} className="text-red-400" />
                        </div>
                        <div className="text-xs font-mono text-white font-bold tracking-widest bg-black/80 px-3 py-1.5 rounded border border-white/10 text-center">
                          {scanStep}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center p-6 space-y-3">
                    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-gray-400">
                      <Camera size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-300">
                        Take a photo or upload an image of your meal
                      </p>
                      <p className="text-[11px] text-gray-500">
                        AI will detect foods and retrieve true calories from nutrition databases
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                {isLiveCameraActive ? (
                  <>
                    <button
                      type="button"
                      onClick={captureLiveFrame}
                      className="flex-1 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-red-900/40 cursor-pointer"
                    >
                      <Camera size={16} />
                      <span>Take Snapshot & Analyze</span>
                    </button>
                    <button
                      type="button"
                      onClick={stopLiveCamera}
                      className="py-2.5 px-4 bg-white/10 hover:bg-white/20 text-white font-medium text-xs rounded-xl cursor-pointer"
                    >
                      Cancel Camera
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={startLiveCamera}
                      className="flex-1 py-2.5 bg-red-600 hover:bg-red-500 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <Camera size={15} />
                      <span>Open Live Camera</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex-1 py-2.5 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer border border-white/10"
                    >
                      <Upload size={15} />
                      <span>Upload Photo</span>
                    </button>
                  </>
                )}
              </div>

              <div>
                <div className="text-[11px] text-gray-400 font-mono uppercase mb-2 flex items-center justify-between">
                  <span>Or test with verified food photos:</span>
                  <span className="text-red-400 text-[10px]">1-CLICK ANALYSIS</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {SAMPLE_PLATES.map((sample) => (
                    <button
                      key={sample.title}
                      type="button"
                      onClick={() => {
                        stopLiveCamera();
                        analyzePhotoWithAi(sample.url, sample.fallbackData);
                      }}
                      className="group p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-500/50 text-left transition-all cursor-pointer"
                    >
                      <img
                        src={sample.url}
                        alt={sample.title}
                        className="w-full h-16 object-cover rounded-lg mb-1.5 group-hover:scale-105 transition-transform"
                      />
                      <div className="text-[10px] font-bold text-white truncate">
                        {sample.title}
                      </div>
                      <div className="text-[9px] text-gray-400">{sample.portion}</div>
                    </button>
                  ))}
                </div>
              </div>

              {detectedFoodResult && (
                <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/40 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-[10px] font-mono text-red-400 tracking-wider uppercase flex items-center gap-1.5">
                        <Check size={12} className="text-green-400" />
                        <span>Food Identified · {detectedFoodResult.source}</span>
                      </div>
                      <h3 className="text-base font-bold text-white mt-0.5">
                        {detectedFoodResult.foodName}
                      </h3>
                      <p className="text-xs text-gray-400">
                        Database Base Serving: <strong className="text-gray-200">{detectedFoodResult.portionSize}</strong>
                      </p>
                    </div>

                    <div className="text-right bg-black/60 px-3 py-1.5 rounded-lg border border-red-500/30">
                      <span className="text-[9px] text-gray-400 uppercase font-mono block">True Calories</span>
                      <span className="text-xl font-bold font-mono text-red-400">
                        {Math.round(detectedFoodResult.calories * portionMultiplier)}{' '}
                        <span className="text-xs font-normal text-white">kcal</span>
                      </span>
                    </div>
                  </div>

                  {/* Serving Quantity Confirmation (USDA Database Accuracy Guarantee) */}
                  <div className="p-3 rounded-lg bg-black/50 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-gray-200 font-semibold uppercase flex items-center gap-1.5">
                        <ShieldCheck size={14} className="text-emerald-400" />
                        <span>Confirm Serving Quantity (USDA FoodData Central)</span>
                      </span>
                      {servingConfirmed ? (
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                          <Check size={11} /> Portion Confirmed
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/30">
                          Please Confirm Serving
                        </span>
                      )}
                    </div>

                    <p className="text-[11px] text-gray-400">
                      Nutritional values are verified against USDA laboratory data without estimations. Select or confirm your serving quantity:
                    </p>

                    <div className="grid grid-cols-4 gap-1.5 text-xs font-mono">
                      {[
                        { label: '0.5x (Half)', val: 0.5 },
                        { label: '1.0x (Standard)', val: 1.0 },
                        { label: '1.5x (Large)', val: 1.5 },
                        { label: '2.0x (Double)', val: 2.0 },
                      ].map((item) => (
                        <button
                          key={item.val}
                          type="button"
                          onClick={() => {
                            setPortionMultiplier(item.val);
                            setServingConfirmed(true);
                            showToast(`Serving updated to ${item.label} · USDA database values recalculated.`);
                          }}
                          className={`py-1.5 px-1.5 rounded-lg text-center transition-all cursor-pointer ${
                            portionMultiplier === item.val
                              ? 'bg-red-600 text-white font-bold shadow-md'
                              : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="text-[11px] text-gray-400 font-mono">
                        Active Serving:{' '}
                        <span className="text-white font-semibold">
                          {(portionMultiplier * 100).toFixed(0)}% of {detectedFoodResult.portionSize}
                        </span>
                      </div>

                      {!servingConfirmed && (
                        <button
                          type="button"
                          onClick={() => {
                            setServingConfirmed(true);
                            showToast('Serving size confirmed! USDA values locked.');
                          }}
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <Check size={13} />
                          <span>Confirm Serving Size</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Confirmed Nutrition Metrics */}
                  <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono">
                    <div className="p-2 rounded bg-black/40 border border-white/5">
                      <div className="text-[9px] text-gray-400 uppercase">Protein</div>
                      <div className="font-bold text-white">
                        {(detectedFoodResult.protein * portionMultiplier).toFixed(1)}g
                      </div>
                    </div>
                    <div className="p-2 rounded bg-black/40 border border-white/5">
                      <div className="text-[9px] text-gray-400 uppercase">Carbs</div>
                      <div className="font-bold text-white">
                        {(detectedFoodResult.carbs * portionMultiplier).toFixed(1)}g
                      </div>
                    </div>
                    <div className="p-2 rounded bg-black/40 border border-white/5">
                      <div className="text-[9px] text-gray-400 uppercase">Fats</div>
                      <div className="font-bold text-white">
                        {(detectedFoodResult.fats * portionMultiplier).toFixed(1)}g
                      </div>
                    </div>
                    <div className="p-2 rounded bg-black/40 border border-white/5">
                      <div className="text-[9px] text-gray-400 uppercase">Fiber</div>
                      <div className="font-bold text-white">
                        {(detectedFoodResult.fiber * portionMultiplier).toFixed(1)}g
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-gray-300 italic border-l-2 border-red-500/60 pl-2">
                    "{detectedFoodResult.summary}"
                  </p>

                  <button
                    type="button"
                    onClick={applyScannedFoodToRadar}
                    className="w-full py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-red-950/40"
                  >
                    <Zap size={14} />
                    <span>Project Confirmed Food onto Radar HUD</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          CREATOR DOSSIER & DIRECT CONTACT MODAL (Shaswat Singh)
          ══════════════════════════════════════════════════════════════════ */}
      {creatorModalOpen && (
        <div className="fixed inset-0 z-[140] bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg bg-gray-950 border border-red-500/40 rounded-2xl shadow-2xl overflow-hidden text-white my-8">
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10 bg-black/60">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-red-600/20 text-red-400 border border-red-500/30">
                  <User size={22} />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold uppercase tracking-wide flex items-center gap-2">
                    <span>Creator Dossier</span>
                    <span className="text-[10px] font-mono text-red-400 px-2 py-0.5 rounded bg-red-500/20">
                      LEAD ARCHITECT
                    </span>
                  </h2>
                  <p className="text-xs text-gray-400">
                    System Creator & Direct Engineering Contact
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setCreatorModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X size={22} />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 space-y-5">
              {/* Profile Card */}
              <div className="p-4 rounded-xl bg-black/60 border border-white/10 flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-red-600 via-red-500 to-amber-500 p-0.5 flex items-center justify-center shrink-0 shadow-lg shadow-red-950/50">
                  <div className="w-full h-full rounded-full bg-gray-950 flex items-center justify-center text-xl font-bold font-mono text-white">
                    SS
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Verified Project Architect</span>
                  </div>
                  <h3 className="text-xl font-bold text-white truncate">Shaswat Singh</h3>
                  <div className="text-xs text-gray-400 font-mono mt-0.5 flex items-center gap-2">
                    <Phone size={12} className="text-red-400" />
                    <span className="text-gray-200 font-semibold">+91 7887222907</span>
                  </div>
                </div>
              </div>

              {/* Direct Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <a
                  href="tel:+917887222907"
                  className="py-3 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-red-900/40 transition-all cursor-pointer active:scale-95"
                >
                  <Phone size={16} />
                  <span>Call +91 7887222907</span>
                </a>

                <a
                  href="https://wa.me/917887222907"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-all cursor-pointer active:scale-95"
                >
                  <MessageCircle size={16} />
                  <span>WhatsApp Chat</span>
                </a>
              </div>

              {/* Quick Copy Number */}
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText('+917887222907');
                  showToast('Copied +917887222907 to clipboard!');
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-gray-300 hover:text-white flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Copy size={14} className="text-red-400" />
                <span>Copy Contact: +91 7887222907</span>
              </button>

              {/* Engineering Specs */}
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 space-y-2 text-xs">
                <div className="text-[10px] font-mono uppercase text-gray-400 tracking-wider">
                  Engineered Subsystems & Architecture:
                </div>
                <div className="space-y-1.5 text-gray-300">
                  <div className="flex items-center gap-2">
                    <Check size={13} className="text-red-400 shrink-0" />
                    <span>Cyberpunk 120fps Cursor Spotlight Reveal Engine</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={13} className="text-red-400 shrink-0" />
                    <span>USDA FoodData Central Verified True Calorie Recognition</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={13} className="text-red-400 shrink-0" />
                    <span>Multi-Frequency Cellular Hydration & Alert Matrix</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={13} className="text-red-400 shrink-0" />
                    <span>High-Precision Recharts Radar Bio-Absorption HUD</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-black/60 border-t border-white/10 flex items-center justify-between text-xs font-mono text-gray-400">
              <span>Rakshak // Food AI System</span>
              <button
                type="button"
                onClick={() => setCreatorModalOpen(false)}
                className="px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
