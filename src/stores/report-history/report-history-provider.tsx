"use client";

import { ReportHistory } from "@/types/report-history";
import { createContext, useCallback, useMemo, useState } from "react";

type ContextValue = {
  selected: ReportHistory | null;
  setSelected: (history: ReportHistory | null) => void;
  clearSelection: () => void;
};

type ProviderProps = {
  children: React.ReactNode;
};

const ReportHistoryContext = createContext<ContextValue | null>(null);

function ReportHistoryProvider({ children }: ProviderProps) {
  const [selected, setSelected] = useState<ReportHistory | null>(null);
  const clearSelection = useCallback(() => setSelected(null), []);

  const value = useMemo(
    () => ({ selected, setSelected, clearSelection }),
    [selected, clearSelection],
  );

  return (
    <ReportHistoryContext.Provider value={value}>
      {children}
    </ReportHistoryContext.Provider>
  );
}

export { ReportHistoryProvider, ReportHistoryContext };
