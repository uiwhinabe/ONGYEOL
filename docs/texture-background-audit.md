# Product texture background audit

## Applied catalog-only correction

- Dakyeolmae reference textures remain unchanged.
- The other 21 textures use background-only copies in `src/assets/products/catalog-textures/`, with the same filenames and pixel dimensions as their originals.
- `ProductCard.jsx` resolves those copies only for catalog hover images. Detail pages continue using their original assets.
- Background pixels are selected by edge connectivity, similarity to the corner background, and low local variation; mask boundaries are feathered on the background side. No image generation outputs, global brightness/color filters, resizing, or subject reconstruction are used.
- Rebuild copies after adding a source texture with `powershell -NoProfile -ExecutionPolicy Bypass -File scripts/normalize-texture-backgrounds.ps1`. Inspect each new result, especially translucent textures; background/subject colors can overlap.
- Existing 0.5-second opacity crossfade and card layout are unchanged.
- Original Odi catalog textures are 150 x 150; Vitamin C catalog textures are 300 x 300. This correction preserves those resolutions and does not claim to restore detail.

The texture CSS background is #FFFFFF. All 28 PNG assets contain non-white opaque background pixels; a white CSS background cannot replace those pixels. Even existing dakyeolmae reference assets have slightly off-white corners. Exact white normalization therefore requires background-only asset editing, preserving translucent texture and shadows. No source image was overwritten. No filters were added.

All affected source assets:

| Product ID | Product name | Original image path |
|---|---|---|
| dakyeolmae-body-scrub | 닥열매 퍼퓸 바디 스크럽, 300g | src/assets/products/dakyeolmae-body-scrub-texture.png |
| dakyeolmae-pad | 닥열매 사각 패드, 70매 | src/assets/products/dakyeolmae-pad-texture.png |
| dakyeolmae-cream | 닥열매 크림, 50ml | src/assets/products/dakyeolmae-cream-texture.png |
| dakyeolmae-ampoule | 닥열매 리페어 앰플, 30ml | src/assets/products/dakyeolmae-ampoule-texture.png |
| dakyeolmae-mist | 닥열매 콜라겐 세럼 미스트, 100ml | src/assets/products/dakyeolmae-mist-texture.png |
| dakyeolmae-toner | 닥열매 워터 토너, 200ml | src/assets/products/dakyeolmae-toner-texture.png |
| dakyeolmae-mask | 닥열매 콜라겐 마스크팩, 8+1매 | src/assets/products/dakyeolmae-mask-texture.png |
| vitamin-c-cleanser | 비타민 C 클렌징폼, 150mL | src/assets/products/vitamin-c-cleanser-texture.png |
| vitamin-c-toner | 비타민 C 토너, 250mL | src/assets/products/vitamin-c-toner-texture.png |
| vitamin-c-pad | 비타민 C 토너 패드, 70매 | src/assets/products/vitamin-c-pad-texture.png |
| vitamin-c-ampoule | 비타민 C 앰플, 30mL | src/assets/products/vitamin-c-ampoule-texture.png |
| vitamin-c-essence | 비타민 C 에센스, 50mL | src/assets/products/vitamin-c-essence-texture.png |
| vitamin-c-lotion | 비타민 C 로션, 150mL | src/assets/products/vitamin-c-lotion-texture.png |
| vitamin-c-cream | 비타민 C 수분크림, 50mL | src/assets/products/vitamin-c-cream-texture.png |
| vitamin-c-mask | 비타민 C 마스크팩, 1매 | src/assets/products/vitamin-c-mask-texture.png |
| odi-toner | 오디 수분 토너, 200ml | src/assets/products/odi-toner-texture.png |
| odi-cream | 오디 보습 크림, 50g | src/assets/products/odi-cream-texture.png |
| odi-mask | 오디 진정 마스크팩 5+1, 25ml | src/assets/products/odi-mask-texture.png |
| odi-ampoule | 오디 토탈 앰플, 50ml | src/assets/products/odi-ampoule-texture.png |
| odi-cleansing-balm | 오디 클렌징밤, 100g | src/assets/products/odi-cleansing-balm-texture.png |
| baekmogi-ampoule | 백목이 수분 농축 앰플, 50ml | src/assets/products/baekmogi-ampoule-texture.png |
| baekmogi-pad | 백목이 커스텀 핏 패드, 100매 | src/assets/products/baekmogi-pad-texture.png |
| baekmogi-cream | 백목이 수분 잠금 크림, 50ml | src/assets/products/baekmogi-cream-texture.png |
| baekmogi-lotion | 백목이 딥 모이스처 로션, 150ml | src/assets/products/baekmogi-lotion-texture.png |
| baekmogi-toner | 백목이 딥 모이스처 토너, 250ml | src/assets/products/baekmogi-toner-texture.png |
| baekmogi-mask | 백목이 수분 베일 마스크, 1매 | src/assets/products/baekmogi-mask-texture.png |
| rose-pdrn-eyecream | PDRN 리페어 로즈 아이크림, 30ml | src/assets/products/rose-eyecream-texture.png |
| rose-pdrn-balancing-cream | PDRN 로즈 밸런싱 크림, 50ml | src/assets/products/rose-balancing-cream-texture.png |

The 0.5s opacity transition and card layout remain unchanged. Future textures should be supplied on #FFFFFF or with carefully prepared alpha transparency. Product detail pages may share these sources, so any future edited backgrounds must be saved as separate catalog-only assets.
