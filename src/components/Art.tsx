import type { ReactNode } from 'react';
import type { ServiceKind } from '../content';

type Tone = 'kraft' | 'white' | 'dark';
const TONES: Record<Tone, [string, string, string]> = {
  kraft: ['#D9C7A3', '#EADDC0', '#B9A47C'],
  white: ['#FFFFFF', '#F4F4F5', '#D4D4D8'],
  dark: ['#232323', '#3A3A3A', '#0F0F0F'],
};

function Carton({
  x,
  y,
  w,
  h,
  o = 28,
  tone = 'kraft',
  tape = true,
  label,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  o?: number;
  tone?: Tone;
  tape?: boolean;
  label?: boolean;
}) {
  const [f, t, s] = TONES[tone];
  const k = 0.55;
  const tapeC = tone === 'dark' ? '#5a5a5a' : tone === 'white' ? '#E4E4E7' : '#C4AE86';
  return (
    <g>
      <polygon points={`${x},${y} ${x + o},${y - o * k} ${x + w + o},${y - o * k} ${x + w},${y}`} fill={t} />
      <polygon points={`${x + w},${y} ${x + w + o},${y - o * k} ${x + w + o},${y + h - o * k} ${x + w},${y + h}`} fill={s} />
      <rect x={x} y={y} width={w} height={h} fill={f} />
      {tape && (
        <>
          <polygon points={`${x + w * 0.42},${y} ${x + w * 0.42 + o},${y - o * k} ${x + w * 0.58 + o},${y - o * k} ${x + w * 0.58},${y}`} fill={tapeC} />
          <rect x={x + w * 0.42} y={y} width={w * 0.16} height={h * 0.32} fill={tapeC} />
        </>
      )}
      {label && (
        <g>
          <rect x={x + w * 0.12} y={y + h * 0.58} width={w * 0.34} height={h * 0.24} fill="#fff" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect key={i} x={x + w * 0.15 + i * (w * 0.05)} y={y + h * 0.62} width={i % 2 ? 2 : 3.5} height={h * 0.16} fill="#0a0a0a" />
          ))}
        </g>
      )}
    </g>
  );
}

const Ground = ({ y = 330 }: { y?: number }) => <ellipse cx="240" cy={y} rx="210" ry="22" fill="#0a0a0a" opacity="0.07" />;

function Shelves({ x = 40, w = 400, ys = [90, 190, 290], dark }: { x?: number; w?: number; ys?: number[]; dark?: boolean }) {
  const c = dark ? '#262626' : '#0A0A0A';
  return (
    <g>
      <rect x={x} y={ys[0] - 70} width="6" height={ys[ys.length - 1] - ys[0] + 78} fill={c} />
      <rect x={x + w} y={ys[0] - 70} width="6" height={ys[ys.length - 1] - ys[0] + 78} fill={c} />
      {ys.map((y) => (
        <rect key={y} x={x} y={y + 8} width={w + 6} height="6" fill={c} />
      ))}
    </g>
  );
}

function Scene({ kind }: { kind: ServiceKind | 'hero' }): ReactNode {
  switch (kind) {
    case 'hero':
      return (
        <>
          <Shelves x={30} w={420} ys={[110, 210]} />
          <Carton x={50} y={62} w={70} h={40} o={20} tone="white" label />
          <Carton x={132} y={52} w={88} h={50} o={22} />
          <Carton x={330} y={64} w={80} h={38} o={20} tone="dark" tape={false} />
          <Carton x={52} y={160} w={96} h={42} o={22} />
          <Carton x={160} y={150} w={64} h={52} o={18} tone="white" label />
          <Ground y={345} />
          <Carton x={250} y={238} w={150} h={96} o={50} label />
          <Carton x={120} y={268} w={110} h={66} o={34} tone="white" />
          <Carton x={150} y={212} w={80} h={56} o={26} />
          <g>
            <rect x="52" y="292" width="42" height="42" fill="#0A0A0A" />
            <rect x="52" y="304" width="42" height="14" fill="#047857" />
            <circle cx="73" cy="270" r="16" fill="#E4E4E7" />
            <rect x="64" y="272" width="18" height="22" fill="#E4E4E7" />
          </g>
        </>
      );
    case 'storage':
      return (
        <>
          <Shelves ys={[90, 190, 290]} />
          <Carton x={58} y={44} w={70} h={38} o={20} />
          <Carton x={140} y={36} w={84} h={46} o={22} tone="white" label />
          <Carton x={240} y={48} w={60} h={34} o={18} />
          <Carton x={330} y={40} w={80} h={42} o={20} tone="dark" tape={false} />
          <Carton x={58} y={140} w={100} h={42} o={24} tone="white" />
          <Carton x={178} y={130} w={72} h={52} o={20} label />
          <Carton x={290} y={142} w={110} h={40} o={22} />
          <Carton x={58} y={236} w={76} h={46} o={22} />
          <Carton x={150} y={240} w={64} h={42} o={18} tone="white" />
          <Carton x={240} y={228} w={90} h={54} o={24} label />
          <Carton x={350} y={244} w={56} h={38} o={16} tone="dark" tape={false} />
        </>
      );
    case 'fulfil':
      return (
        <>
          <Ground y={340} />
          <rect x="40" y="250" width="400" height="14" fill="#0A0A0A" />
          <rect x="60" y="264" width="10" height="70" fill="#0A0A0A" />
          <rect x="410" y="264" width="10" height="70" fill="#0A0A0A" />
          <Carton x={80} y={176} w={150} h={74} o={44} tape={false} tone="kraft" />
          <polygon points="80,176 66,150 196,150 224,176" fill="#EADDC0" />
          <rect x="108" y="150" width="30" height="42" fill="#fff" />
          <rect x="146" y="140" width="26" height="46" fill="#0A0A0A" />
          <rect x="146" y="158" width="26" height="9" fill="#047857" />
          <Carton x={290} y={190} w={110} h={60} o={30} label />
          <rect x="260" y="226" width="20" height="24" fill="#0A0A0A" />
          <rect x="248" y="238" width="44" height="12" fill="#0A0A0A" />
        </>
      );
    case 'shipping':
      return (
        <>
          <Ground />
          <Carton x={110} y={140} w={190} h={150} o={70} label tone="kraft" />
          <g transform="translate(168 188)">
            <rect width="104" height="70" fill="#fff" stroke="#0a0a0a" strokeWidth="2" />
            <rect x="8" y="8" width="40" height="6" fill="#0a0a0a" />
            <rect x="8" y="20" width="60" height="4" fill="#9a9aa3" />
            <rect x="8" y="28" width="52" height="4" fill="#9a9aa3" />
            {Array.from({ length: 22 }).map((_, i) => (
              <rect key={i} x={8 + i * 4.3} y="42" width={i % 3 ? 1.8 : 3} height="20" fill="#0a0a0a" />
            ))}
          </g>
          <path d="M60 330 H420" stroke="#0A0A0A" strokeWidth="2" strokeDasharray="2 10" strokeLinecap="round" />
        </>
      );
    case 'returns':
      return (
        <>
          <Ground y={338} />
          <polygon points="60,270 420,270 390,320 90,320" fill="#0A0A0A" />
          <polygon points="76,270 404,270 396,282 84,282" fill="#262626" />
          <Carton x={110} y={190} w={110} h={64} o={30} tape={false} />
          <rect x="260" y="212" width="40" height="52" fill="#fff" />
          <rect x="268" y="196" width="24" height="20" fill="#E4E4E7" />
          <rect x="318" y="226" width="40" height="38" fill="#0A0A0A" />
          <circle cx="338" cy="214" r="20" fill="none" stroke="#047857" strokeWidth="5" />
          <path d="M330 214l6 6 12-14" fill="none" stroke="#047857" strokeWidth="5" strokeLinecap="round" />
          <path d="M150 140 a60 60 0 0 1 110 -20" fill="none" stroke="#0A0A0A" strokeWidth="4" strokeLinecap="round" />
          <polygon points="266,100 270,128 244,122" fill="#0A0A0A" />
        </>
      );
    case 'photo':
      return (
        <>
          <path d="M70 60 H410 V230 Q410 262 380 262 H100 Q70 262 70 230 Z" fill="#fff" />
          <path d="M70 230 Q240 300 410 230 V330 H70Z" fill="#E4E4E7" opacity="0.0" />
          <rect x="70" y="262" width="340" height="68" fill="#E4E4E7" />
          <rect x="190" y="206" width="52" height="56" fill="#0A0A0A" />
          <rect x="198" y="196" width="36" height="12" fill="#262626" />
          <rect x="190" y="224" width="52" height="16" fill="#fff" />
          <rect x="196" y="229" width="26" height="3" fill="#0A0A0A" />
          <rect x="262" y="232" width="44" height="30" fill="#047857" />
          <rect x="130" y="240" width="40" height="22" fill="#D9C7A3" />
          <g transform="translate(360 40)">
            <rect x="-6" y="0" width="12" height="150" fill="#0A0A0A" />
            <rect x="-34" y="-8" width="68" height="34" fill="#0A0A0A" />
            <rect x="-26" y="0" width="52" height="14" fill="#fff" />
          </g>
          <path d="M340 70 L250 210 H290 Z" fill="#fff" opacity="0.5" />
        </>
      );
    case 'label':
      return (
        <>
          <Ground y={338} />
          <Carton x={250} y={170} w={130} h={100} o={40} tone="white" tape />
          <g>
            <rect x="272" y="206" width="80" height="44" fill="#fff" stroke="#0a0a0a" strokeWidth="2" />
            <rect x="280" y="214" width="30" height="5" fill="#0a0a0a" />
            <rect x="280" y="224" width="56" height="4" fill="#9a9aa3" />
            {Array.from({ length: 14 }).map((_, i) => (
              <rect key={i} x={280 + i * 4} y="232" width={i % 2 ? 1.6 : 2.8} height="12" fill="#0a0a0a" />
            ))}
          </g>
          <ellipse cx="150" cy="260" rx="82" ry="22" fill="#262626" />
          <rect x="68" y="190" width="164" height="70" fill="#262626" />
          <ellipse cx="150" cy="190" rx="82" ry="22" fill="#3A3A3A" />
          <ellipse cx="150" cy="190" rx="26" ry="7" fill="#F4F4F5" />
          <path d="M232 214 C262 226 230 270 270 282 L312 286" fill="none" stroke="#fff" strokeWidth="26" strokeLinecap="round" opacity="0.0" />
          <polygon points="150,282 230,282 300,300 220,300" fill="#fff" stroke="#0a0a0a" strokeWidth="2" />
        </>
      );
    case 'repack':
      return (
        <>
          <Ground y={336} />
          <g opacity="0.55">
            <Carton x={50} y={220} w={100} h={80} o={30} tone="white" tape={false} />
          </g>
          <rect x="62" y="232" width="40" height="60" fill="#0A0A0A" />
          <path d="M184 262 H232" stroke="#047857" strokeWidth="5" strokeLinecap="round" />
          <polygon points="228,248 244,262 228,276" fill="#047857" />
          <Carton x={270} y={196} w={140} h={104} o={44} label />
          <rect x="288" y="226" width="30" height="46" fill="#0A0A0A" opacity="0" />
        </>
      );
  }
}

export function Art({
  kind,
  label,
  className = '',
  dark,
}: {
  kind: ServiceKind | 'hero';
  label: string;
  className?: string;
  dark?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 480 380"
      role="img"
      aria-label={label}
      className={`block h-full w-full ${className}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="480" height="380" fill={dark ? '#141414' : '#F5F5F6'} />
      <rect y="338" width="480" height="42" fill={dark ? '#0b0b0b' : '#EBEBED'} />
      <g>{Scene({ kind })}</g>
    </svg>
  );
}
