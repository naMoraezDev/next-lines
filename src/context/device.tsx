import { createContext, useContext } from "react";
import { useRouter } from "next/router";
import { hasDesktopInUrl } from "./utils";

type DeviceContextState = {
  isDesktop?: boolean;
};

type DeviceProviderProps = {
  children?: React.ReactNode;
} & DeviceContextState;

export const DeviceContext = createContext<DeviceContextState | null>(null);

DeviceContext.displayName = "DeviceContext";

export function DeviceProvider(props: DeviceProviderProps) {
  const router = useRouter();
  let isDesktop = props.isDesktop;
  const isClientSide = isDesktop === undefined;

  if (isClientSide) {
    isDesktop = hasDesktopInUrl(router.pathname);
  }

  return (
    <DeviceContext.Provider value={{ isDesktop: Boolean(isDesktop) }}>
      {props.children}
    </DeviceContext.Provider>
  );
}

export function useDeviceContext(): DeviceContextState {
  return useContext(DeviceContext) as DeviceContextState;
}
