import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export type Theme = "light" | "dark" | "auto";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  changes$ = new BehaviorSubject<Theme>("auto");

  constructor() {}

  private getStoredTheme(): Theme {
    const theme = localStorage.getItem("theme");
    if (theme) {
      return theme as Theme;
    } else {
      return "auto";
    }
  }

  private setStoredTheme(theme: Theme) {
    if (theme) {
      localStorage.setItem("theme", theme);
    } else {
      localStorage.removeItem("theme");
    }
    this.changes$.next(theme);
  }

  public getPreferredResolvedTheme() {
    const storedTheme = this.getStoredTheme();
    if (storedTheme) {
      if (storedTheme === "auto") {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          return "dark";
        } else {
          return "light";
        }
      }
      return storedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  public getPreferredTheme() {
    const storedTheme = this.getStoredTheme();
    if (storedTheme) {
      return storedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  public setTheme(theme: Theme) {
    if (theme === "auto" && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.setAttribute("data-bs-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-bs-theme", theme as string);
    }
    this.setStoredTheme(theme);
  }
}
