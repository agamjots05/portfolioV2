'use client';

import { useRef, useEffect, useState, forwardRef, useCallback } from "react";
import { Renderer, Program, Triangle, Mesh } from "ogl";
import { cn } from '@/lib/utils';

type RaysOrigin = "top-center" | "center" | "bottom-center" | "left-center" | "right-center";

interface Uniforms {
  iTime: { value: number };
  iResolution: { value: [number, number] };
  rayPos: { value: [number, number] };
  rayDir: { value: [number, number] };
  raysColor: { value: [number, number, number] };
  raysSpeed: { value: number };
  lightSpread: { value: number };
  rayLength: { value: number };
  pulsating: { value: number };
  fadeDistance: { value: number };
  saturation: { value: number };
  mousePos: { value: [number, number] };
  mouseInfluence: { value: number };
  noiseAmount: { value: number };
  distortion: { value: number };
}

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  followMouse?: boolean;
  className?: string;
  isBackground?: boolean;
  fixedLightSource?: boolean;
  raysOrigin?: RaysOrigin;
  raysColor?: string;
  raysSpeed?: number;
  lightSpread?: number;
  rayLength?: number;
  pulsating?: boolean;
  fadeDistance?: number;
  saturation?: number;
  mouseInfluence?: number;
  noiseAmount?: number;
  distortion?: number;
}

interface MousePosition {
  x: number;
  y: number;
}

const DEFAULT_COLOR = "#ffffff";

const hexToRgb = (hex: string): [number, number, number] => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m
    ? [
        parseInt(m[1], 16) / 255,
        parseInt(m[2], 16) / 255,
        parseInt(m[3], 16) / 255,
      ]
    : [1, 1, 1];
};

const getAnchorAndDir = (
  origin: RaysOrigin,
  w: number,
  h: number
): { anchor: [number, number]; dir: [number, number] } => {
  const outside = 0.2;
  switch (origin) {
    case "top-center":
      return { anchor: [0.5 * w, -outside * h], dir: [0, 1] };
    case "center":
      return { anchor: [0.5 * w, 0.5 * h], dir: [0, 1] };
    case "bottom-center":
      return { anchor: [0.5 * w, (1 + outside) * h], dir: [0, -1] };
    case "left-center":
      return { anchor: [-outside * w, 0.5 * h], dir: [1, 0] };
    case "right-center":
      return { anchor: [(1 + outside) * w, 0.5 * h], dir: [-1, 0] };
    default: // "top-center"
      return { anchor: [0.5 * w, -outside * h], dir: [0, 1] };
  }
};

export const LightRaysBackground = forwardRef<HTMLDivElement, Props>(
  ({ 
    followMouse = true, 
    className,
    isBackground = false,
    fixedLightSource = false,
    raysOrigin = "top-center",
    raysColor = DEFAULT_COLOR,
    raysSpeed = 1,
    lightSpread = 1,
    rayLength = 2,
    pulsating = false,
    fadeDistance = 1.0,
    saturation = 1.0,
    mouseInfluence = 0.1,
    noiseAmount = 0.0,
    distortion = 0.0,
    ...props 
  }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const rendererRef = useRef<Renderer | null>(null);
    const mouseRef = useRef<MousePosition>({ x: 0.5, y: 0.5 });
    const uniformsRef = useRef<Uniforms | null>(null);
    const smoothMouseRef = useRef<MousePosition>({ x: 0.5, y: 0.5 });
    const animationIdRef = useRef<number | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const observerRef = useRef<IntersectionObserver | null>(null);

    const handleMouseMove = useCallback((event: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      mouseRef.current = { x: mouseX / rect.width, y: mouseY / rect.height };
    }, []);

    const handleTouchMove = useCallback((event: TouchEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const touch = event.touches[0];
      const mouseX = touch.clientX - rect.left;
      const mouseY = touch.clientY - rect.top;

      mouseRef.current = { x: mouseX / rect.width, y: mouseY / rect.height };
    }, []);

    useEffect(() => {
      if (followMouse) {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("touchmove", handleTouchMove);
        return () => {
          window.removeEventListener("mousemove", handleMouseMove);
          window.removeEventListener("touchmove", handleTouchMove);
        };
      }
    }, [followMouse, handleMouseMove, handleTouchMove]);

    useEffect(() => {
      if (!containerRef.current) return;

      // For background mode, always consider it visible
      if (isBackground) {
        setIsVisible(true);
        return;
      }

      observerRef.current = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          setIsVisible(entry.isIntersecting);
        },
        { threshold: 0.1 }
      );

      observerRef.current.observe(containerRef.current);

      return () => {
        if (observerRef.current) {
          observerRef.current.disconnect();
          observerRef.current = null;
        }
      };
    }, [isBackground]);

    useEffect(() => {
      if (!isVisible || !containerRef.current) return;

      const initializeWebGL = async () => {
        if (!containerRef.current) return;

        await new Promise((resolve) => setTimeout(resolve, 10));

        if (!containerRef.current) return;

        const renderer = new Renderer({
          dpr: Math.min(window.devicePixelRatio, 2),
          alpha: true,
        });
        rendererRef.current = renderer;

        const gl = renderer.gl;
        gl.canvas.style.width = "100%";
        gl.canvas.style.height = "100%";

        while (containerRef.current.firstChild) {
          containerRef.current.removeChild(containerRef.current.firstChild);
        }
        containerRef.current.appendChild(gl.canvas);

        const vert = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

        const frag = `precision highp float;

uniform float iTime;
uniform vec2  iResolution;

uniform vec2  rayPos;
uniform vec2  rayDir;
uniform vec3  raysColor;
uniform float raysSpeed;
uniform float lightSpread;
uniform float rayLength;
uniform float pulsating;
uniform float fadeDistance;
uniform float saturation;
uniform vec2  mousePos;
uniform float mouseInfluence;
uniform float noiseAmount;
uniform float distortion;

varying vec2 vUv;

float noise(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord,
                  float seedA, float seedB, float speed) {
  vec2 sourceToCoord = coord - raySource;
  vec2 dirNorm = normalize(sourceToCoord);
  float cosAngle = dot(dirNorm, rayRefDirection);

  float distortedAngle = cosAngle + distortion * sin(iTime * 2.0 + length(sourceToCoord) * 0.01) * 0.2;
  
  float spreadFactor = pow(max(distortedAngle, 0.0), 1.0 / max(lightSpread, 0.001));

  float distance = length(sourceToCoord);
  float maxDistance = iResolution.x * rayLength;
  float lengthFalloff = clamp((maxDistance - distance) / maxDistance, 0.0, 1.0);
  
  float fadeFalloff = clamp((iResolution.x * fadeDistance - distance) / (iResolution.x * fadeDistance), 0.5, 1.0);
  float pulse = pulsating > 0.5 ? (0.8 + 0.2 * sin(iTime * speed * 3.0)) : 1.0;

  float baseStrength = clamp(
    (0.45 + 0.15 * sin(distortedAngle * seedA + iTime * speed)) +
    (0.3 + 0.2 * cos(-distortedAngle * seedB + iTime * speed)),
    0.0, 1.0
  );

  return baseStrength * lengthFalloff * fadeFalloff * spreadFactor * pulse;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 coord = vec2(fragCoord.x, iResolution.y - fragCoord.y);
  
  vec2 finalRayDir = rayDir;
  if (mouseInfluence > 0.0) {
    vec2 mouseScreenPos = mousePos * iResolution.xy;
    vec2 mouseDirection = normalize(mouseScreenPos - rayPos);
    finalRayDir = normalize(mix(rayDir, mouseDirection, mouseInfluence));
  }

  vec4 rays1 = vec4(1.0) *
               rayStrength(rayPos, finalRayDir, coord, 36.2214, 21.11349,
                           1.5 * raysSpeed);
  vec4 rays2 = vec4(1.0) *
               rayStrength(rayPos, finalRayDir, coord, 22.3991, 18.0234,
                           1.1 * raysSpeed);

  fragColor = rays1 * 0.5 + rays2 * 0.4;

  if (noiseAmount > 0.0) {
    float n = noise(coord * 0.01 + iTime * 0.1);
    fragColor.rgb *= (1.0 - noiseAmount + noiseAmount * n);
  }

  float brightness = 1.0 - (coord.y / iResolution.y);
fragColor.x *= 0.8 + brightness * 0.2;
  fragColor.y *= 0.8 + brightness * 0.2;
  fragColor.z *= 0.8 + brightness * 0.2;

  if (saturation != 1.0) {
    float gray = dot(fragColor.rgb, vec3(0.299, 0.587, 0.114));
    fragColor.rgb = mix(vec3(gray), fragColor.rgb, saturation);
  }

  fragColor.rgb *= raysColor;
}

void main() {
  vec4 color;
  mainImage(color, gl_FragCoord.xy);
  gl_FragColor  = color;
}`;

        const uniforms: Uniforms = {
          iTime: { value: 0 },
          iResolution: { value: [1, 1] },

          rayPos: { value: [0, 0] },
          rayDir: { value: [0, 1] },

          raysColor: { value: hexToRgb(raysColor || DEFAULT_COLOR) },
          raysSpeed: { value: raysSpeed || 1 },
          lightSpread: { value: lightSpread || 1 },
          rayLength: { value: rayLength || 2 },
          pulsating: { value: pulsating ? 1.0 : 0.0 },
          fadeDistance: { value: fadeDistance || 1.0 },
          saturation: { value: saturation || 1.0 },
          mousePos: { value: [0.5, 0.5] },
          mouseInfluence: { value: mouseInfluence || 0.1 },
          noiseAmount: { value: noiseAmount || 0.0 },
          distortion: { value: distortion || 0.0 },
        };
        uniformsRef.current = uniforms;

        const geometry = new Triangle(gl);
        const program = new Program(gl, {
          vertex: vert,
          fragment: frag,
          uniforms,
        });
        const mesh = new Mesh(gl, { geometry, program });

        const updatePlacement = () => {
          if (!containerRef.current || !rendererRef.current) return;

          rendererRef.current.dpr = Math.min(window.devicePixelRatio, 2);

          const { clientWidth: wCSS, clientHeight: hCSS } = containerRef.current;
          rendererRef.current.setSize(wCSS, hCSS);

          const dpr = rendererRef.current.dpr;
          const w = wCSS * dpr;
          const h = hCSS * dpr;

          uniforms.iResolution.value = [w, h];

          const { anchor, dir } = getAnchorAndDir(raysOrigin || "top-center", w, h);
          uniforms.rayPos.value = anchor;
          uniforms.rayDir.value = dir;
        };

        const loop = (t: number) => {
          if (!rendererRef.current || !uniformsRef.current) {
            return;
          }

          uniforms.iTime.value = t * 0.001;

          if (followMouse && mouseInfluence > 0.0) {
            const smoothing = 0.92;

            smoothMouseRef.current.x =
              smoothMouseRef.current.x * smoothing +
              mouseRef.current.x * (1 - smoothing);
            smoothMouseRef.current.y =
              smoothMouseRef.current.y * smoothing +
              mouseRef.current.y * (1 - smoothing);

            uniforms.mousePos.value = [
              smoothMouseRef.current.x,
              smoothMouseRef.current.y,
            ];
          }

          try {
            rendererRef.current.render({ scene: mesh });
            animationIdRef.current = requestAnimationFrame(loop);
          } catch (error) {
            console.warn("WebGL rendering error:", error);
            return;
          }
        };

        window.addEventListener("resize", updatePlacement);
        updatePlacement();
        animationIdRef.current = requestAnimationFrame(loop);

        return () => {
          if (animationIdRef.current) {
            cancelAnimationFrame(animationIdRef.current);
            animationIdRef.current = null;
          }

          window.removeEventListener("resize", updatePlacement);

          if (rendererRef.current) {
            try {
              const canvas = rendererRef.current.gl.canvas;
              const loseContextExt =
                rendererRef.current.gl.getExtension("WEBGL_lose_context");
              if (loseContextExt) {
                loseContextExt.loseContext();
              }

              if (canvas && canvas.parentNode) {
                canvas.parentNode.removeChild(canvas);
              }
            } catch (error) {
              console.warn("Error during WebGL cleanup:", error);
            }
          }

          rendererRef.current = null;
          uniformsRef.current = null;
        };
      };

      initializeWebGL();

      return () => {
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current);
          animationIdRef.current = null;
        }
      };
    }, [
      isVisible,
      raysOrigin,
      raysColor,
      raysSpeed,
      lightSpread,
      rayLength,
      pulsating,
      fadeDistance,
      saturation,
      followMouse,
      mouseInfluence,
      noiseAmount,
      distortion,
      isBackground,
      fixedLightSource,
    ]);

    useEffect(() => {
      if (!uniformsRef.current || !containerRef.current || !rendererRef.current)
        return;

      const u = uniformsRef.current;
      const renderer = rendererRef.current;

      u.raysColor.value = hexToRgb(raysColor || DEFAULT_COLOR);
      u.raysSpeed.value = raysSpeed || 1;
      u.lightSpread.value = lightSpread || 1;
      u.rayLength.value = rayLength || 2;
      u.pulsating.value = pulsating ? 1.0 : 0.0;
      u.fadeDistance.value = fadeDistance || 1.0;
      u.saturation.value = saturation || 1.0;
      u.mouseInfluence.value = mouseInfluence || 0.1;
      u.noiseAmount.value = noiseAmount || 0.0;
      u.distortion.value = distortion || 0.0;

      const { clientWidth: wCSS, clientHeight: hCSS } = containerRef.current;
      const dpr = renderer.dpr;
      const { anchor, dir } = getAnchorAndDir(raysOrigin || "top-center", wCSS * dpr, hCSS * dpr);
      u.rayPos.value = anchor;
      u.rayDir.value = dir;
    }, [
      raysColor,
      raysSpeed,
      lightSpread,
      raysOrigin,
      rayLength,
      pulsating,
      fadeDistance,
      saturation,
      mouseInfluence,
      noiseAmount,
      distortion,
    ]);

    return (
      <div
        ref={(node) => {
          containerRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn(
          "w-full h-full pointer-events-none overflow-hidden relative",
          isBackground 
            ? fixedLightSource 
              ? "fixed top-0 left-0 w-screen h-screen z-[-1]" 
              : "absolute top-0 left-0 w-full h-full z-[-1]"
            : "z-[3]",
          className
        )}
        {...props}
      />
    );
  }
);

LightRaysBackground.displayName = 'LightRaysBackground';