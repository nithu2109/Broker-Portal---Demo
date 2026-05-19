"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import { Bell } from "lucide-react";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useUser } from "@/lib/context/UserContext";
import { useThemeToggle } from "@/app/providers";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  showUser?: boolean;
}

interface DecodedToken {
  name?: string;
  email?: string;
  preferred_username?: string;
  upn?: string;
  unique_name?: string;
  given_name?: string;
  family_name?: string;
  [key: string]: any;
}

export default function DashboardHeader({ title, subtitle, showUser = true }: DashboardHeaderProps) {
  const { isDarkMode, toggleTheme } = useThemeToggle();
  const [displayName, setDisplayName] = useState("");
  let user = null;
  try {
    const context = useUser();
    user = context?.user;
  } catch (error) {
    // UserContext not available, will use fallback
  }

  const resolveDisplayIdentity = () => {
    // Prefer persisted user identity from localStorage for consistent header display.
    const storedIdentity =
      localStorage.getItem("bp_broker_email") ||
      localStorage.getItem("userEmail") ||
      localStorage.getItem("bp_broker_name") ||
      localStorage.getItem("userName");

    if (storedIdentity) {
      setDisplayName(storedIdentity);
      return;
    }

    // Fallback to UserContext
    if (user?.email || user?.name) {
      setDisplayName((user.email || user.name) ?? "");
      return;
    }

    // Last resort: decode the JWT token
    try {
      const token = localStorage.getItem("bp_token");
      if (token) {
        const decoded = jwtDecode<DecodedToken>(token);
        const identity =
          decoded.email ||
          decoded.preferred_username ||
          decoded.upn ||
          decoded.unique_name ||
          decoded.name ||
          (decoded.given_name && decoded.family_name ? `${decoded.given_name} ${decoded.family_name}` : "") ||
          decoded.given_name ||
          "";

        if (identity) {
          setDisplayName(identity);
          // Persist for future page loads.
          if (identity.includes("@")) {
            localStorage.setItem("userEmail", identity);
          } else {
            localStorage.setItem("userName", identity);
          }
        }
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  };

  useEffect(() => {
    resolveDisplayIdentity();
    // Retry once after mount in case localStorage is populated slightly later.
    const t = setTimeout(resolveDisplayIdentity, 250);
    return () => clearTimeout(t);
  }, [user]);

  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        bgcolor: isDarkMode ? "#0B0D10" : "#FFFFFF",
        borderBottom: "1px solid var(--border)",
        pl: "0px",
        pr: "24px",
        height: "56px",
        position: "sticky",
        top: 0,
        zIndex: 20,
        flexShrink: 0,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
        <Box
          sx={{
            width: "1px",
            height: "20px",
            bgcolor: "#797979",
            alignSelf: "center",
            flexShrink: 0,
          }}
        />
        <Box
          sx={{
            ml: "12px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
            transform: "translateY(-2px)",
          }}
        >
          {showUser && (
            <Typography
              variant="body2"
              sx={{
                fontSize: "0.8125rem",
                fontWeight: 400,
                color: "var(--muted-foreground)",
                mb: "2px",
              }}
            >
              Welcome Back
              {displayName && (
                <>
                  !{" "}
                  <Typography
                    component="span"
                    sx={{
                      color: "var(--foreground)",
                      fontWeight: 500,
                      fontSize: "inherit",
                    }}
                  >
                    {displayName}
                  </Typography>
                </>
              )}
            </Typography>
          )}
          {title ? (
            <Typography
              variant="h1"
              sx={{
                fontSize: "1.5rem",
                fontWeight: 500,
                color: "var(--foreground)",
                lineHeight: 1.5,
              }}
            >
              {title}
            </Typography>
          ) : null}
          {subtitle && (
            <Typography
              variant="body2"
              sx={{
                fontSize: "0.875rem",
                fontWeight: 400,
                color: "var(--muted-foreground)",
                mt: "4px",
                lineHeight: 1.5,
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Tooltip
          title={isDarkMode ? "Light Mode" : "Dark Mode"}
          aria-label="Toggle Theme"
        >
          <IconButton
            onClick={toggleTheme}
            aria-label="Toggle theme"
            sx={{
              width: "36px",
              height: "36px",
              borderRadius: "6px",
              color: isDarkMode ? "#FFFFFF" : "#616161",
              bgcolor: "transparent",
              "&:hover": {
                bgcolor: "color-mix(in oklab, #1fc3eb 50%, transparent)",
                color: isDarkMode ? "#FFFFFF" : "#0A0A0A",
              },
            }}
          >
            {isDarkMode ? (
              <Brightness7Icon sx={{ fontSize: 18 }} />
            ) : (
              <Brightness4Icon sx={{ fontSize: 18 }} />
            )}
          </IconButton>
        </Tooltip>

        <IconButton
          suppressHydrationWarning
          aria-label="Notifications"
          sx={{
            width: "36px",
            height: "36px",
            borderRadius: "6px",
            color: isDarkMode ? "#FFFFFF" : "#616161",
            bgcolor: "transparent",
            "&:hover": {
              bgcolor: "color-mix(in oklab, #1fc3eb 50%, transparent)",
              color: isDarkMode ? "#FFFFFF" : "#0A0A0A",
            },
          }}
        >
          <Badge
            variant="dot"
            sx={{
              "& .MuiBadge-badge": {
                bgcolor: "#1FC3EB",
                width: "6px",
                height: "6px",
                borderRadius: "50%",
              },
            }}
          >
            <Bell size={16} />
          </Badge>
        </IconButton>
      </Box>
    </Box>
  );
}
