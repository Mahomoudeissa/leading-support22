import React, { createContext, useContext, useState } from 'react';

export type DemoScenario = 'none' | 'submit-fail' | 'id-error' | 'iban-error' | 'contact-fail';

interface DemoContextType {
  scenario: DemoScenario;
  setScenario: (s: DemoScenario) => void;
  resetAll: () => void;
  resetCount: number;
}

const DemoContext = createContext<DemoContextType>({
  scenario: 'none',
  setScenario: () => {},
  resetAll: () => {},
  resetCount: 0,
});

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [scenario, setScenario] = useState<DemoScenario>('none');
  const [resetCount, setResetCount] = useState(0);

  const resetAll = () => {
    setScenario('none');
    setResetCount((c) => c + 1);
  };

  return (
    <DemoContext.Provider value={{ scenario, setScenario, resetAll, resetCount }}>
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  return useContext(DemoContext);
}

export function DemoPanel({ mode = 'all' }: { mode?: 'register' | 'contact' | 'all' }) {
  const { scenario, setScenario, resetAll } = useDemo();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside
      aria-label="أداة معاينة حالات النموذج التجريبي"
      className="fixed bottom-4 left-4 z-40 max-w-sm rounded-panel border border-line bg-surface/95 p-3.5 shadow-xl backdrop-blur-sm text-xs font-sans"
    >
      <div className="flex items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="font-bold text-ink">معاينة الحالات — للتصميم فقط</span>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="text-muted hover:text-ink px-1.5 py-0.5 rounded border border-line hover:bg-canvas transition-colors"
        >
          {isOpen ? 'تصغير' : 'توسيع'}
        </button>
      </div>

      <p className="text-muted leading-relaxed text-[11px] mb-2.5">
        أداة داخلية لعرض حالات الأخطاء في النموذج التجريبي، وليست جزءا من الموقع.
      </p>

      {isOpen && (
        <div className="space-y-2 border-t border-line pt-2">
          <label className="block text-ink font-semibold">حدد السيناريو المراد اختباره:</label>
          <select
            value={scenario}
            onChange={(e) => setScenario(e.target.value as DemoScenario)}
            className="w-full rounded-control border border-line bg-white px-2.5 py-1.5 text-xs text-ink focus:border-accent"
          >
            <option value="none">السلوك الطبيعي (نجاح افتراضي)</option>
            {(mode === 'register' || mode === 'all') && (
              <>
                <option value="submit-fail">فشل إرسال الحساب (خطأ في الإرسال النهائي)</option>
                <option value="id-error">خطأ في رقم الهوية (سيناريو فشل الهوية الوطنية)</option>
                <option value="iban-error">خطأ في رقم الآيبان (سيناريو فشل الآيبان)</option>
              </>
            )}
            {(mode === 'contact' || mode === 'all') && (
              <option value="contact-fail">فشل إرسال الاستفسار (خطأ تجريبي في التواصل)</option>
            )}
          </select>

          <button
            type="button"
            onClick={resetAll}
            className="w-full mt-2 rounded-control bg-canvas hover:bg-line/70 text-ink border border-line px-2.5 py-1.5 font-medium transition-colors"
          >
            مسح بيانات النموذج التجريبي
          </button>
        </div>
      )}
    </aside>
  );
}
