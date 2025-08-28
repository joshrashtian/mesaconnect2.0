"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { config, supabase } from "../../config/mesa-config";
import { useId, useSettings } from "@/app/AuthContext";

type SettingsData = Record<string, any> | undefined;

function getReleaseNotes(version: string | undefined): {
  title: string;
  description: string;
} {
  if (!version)
    return {
      title: "What's new",
      description: "MESA Connect has been updated.",
    };
  // Placeholder mapping: customize per release
  const notesByVersion: Record<string, { title: string; description: string }> =
    {
      // e.g. "0.1.1": { title: "Improved Social Feed", description: "Faster loading and better media uploads." }
    };
  return (
    notesByVersion[version] ?? {
      title: `What's new in v${version}`,
      description:
        "We updated our post editor to support rich text. You can now use the editor to create posts with images, videos, and more.",
    }
  );
}

export default function UpdateDialog() {
  const { id: userId, isSignedIn } = useId();
  const settings = useSettings() as SettingsData;
  const [open, setOpen] = React.useState(false);

  const currentVersion = String(config.versionNumber ?? "").trim();

  React.useEffect(() => {
    if (!currentVersion) return; // no version configured

    if (isSignedIn) {
      if (!userId) return; // wait for user id
      if (settings === undefined) return; // wait for settings to load
      const lastSeen =
        (settings?.last_seen_version as string | undefined) ?? undefined;
      if (!lastSeen || lastSeen !== currentVersion) setOpen(true);
      return;
    }

    if (typeof window !== "undefined") {
      const key = `updateSeen:${currentVersion}`;
      const hasSeen = window.localStorage.getItem(key);
      if (!hasSeen) setOpen(true);
    }
  }, [isSignedIn, userId, currentVersion, settings]);

  async function acknowledgeUpdateOnce() {
    if (!currentVersion) return;
    try {
      if (isSignedIn && userId) {
        const merged: Record<string, any> = {
          ...(settings ?? {}),
          last_seen_version: currentVersion,
        };
        await supabase
          .from("settings")
          .upsert({ id: userId, data: merged }, { onConflict: "id" });
      } else if (typeof window !== "undefined") {
        window.localStorage.setItem(`updateSeen:${currentVersion}`, "1");
      }
    } catch (err) {
      // swallow errors; this should not block UX
      console.warn("Failed to persist update acknowledgement", err);
    } finally {
      setOpen(false);
    }
  }

  if (!currentVersion) return null;

  const notes = getReleaseNotes(currentVersion);

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => (v ? setOpen(true) : acknowledgeUpdateOnce())}
    >
      <DialogContent className="bg-zinc-100 font-eudoxus dark:bg-zinc-800">
        <DialogHeader>
          <DialogTitle>{notes.title}</DialogTitle>
          <DialogDescription>{notes.description}</DialogDescription>
        </DialogHeader>
        <div className="text-sm text-muted-foreground">
          {/* Add richer content per release if desired */}
          <p>Version: v{currentVersion}</p>
        </div>
        <DialogFooter>
          <button
            onClick={acknowledgeUpdateOnce}
            className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
          >
            Got it
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
