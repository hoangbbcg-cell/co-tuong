# Province picker artwork

- Picker title: font-heading34px desktop/22px compact, centered in the existing title area.

- Presence (2026-10-13): province counts follow the currently selected area in RoomSelection, initially the profile address. Selecting an area moves this user's server presence there without editing the profile or altering room counts.

- Content sizing (2026-10-13): icon box26cqw wide/full card height, object-contain; tall icons may touch top/bottom borders. Province name uses font-heading min(36px,7cqw); counts use font-number min(28px,5.5cqw). This supersedes older small icon/text measurements below.

- Visible list (2026-10-13, revised): exactly four rows per scroll viewport, two columns desktop/one compact. Row height is (available height - 24px)/4, vertical gap8px. User explicitly requested stretching cards to fill their rows; card artwork uses object-fill here. Additional rows scroll with the existing hidden scrollbar. Horizontal gap remains12px desktop/8px compact.

- Latest frame override (2026-10-13): use `../references/uploads/72f80581-6af2-490e-b9fa-fcdf2f104da8.png`, crop (41,58,1369,953). Keep the e05c67be card (191,831,1066,187). Desktop close hit area follows the X already painted in the frame; SVG X only renders in compact mode. The script now reproduces this mixed-source pair.

- Current artwork (2026-10-13): both images come from `../references/uploads/e05c67be-c3da-4cdb-bece-77e6fdd38dae.png`. Frame crop (44,53,1360,720); card crop (191,831,1066,187). Script splits at y=800 before alpha-component trimming. Previous sources below are retained for history. Cards preserve the new aspect ratio; text/icons scale with card width. The frame has no close artwork, so its HTML close button renders an SVG X.

- Current-area name: 22px desktop/18px compact, left aligned font-heading, without arrow. Entire card remains clickable.

- Current-area card also uses the province icon catalog, keyed by the selected province (initially the profile address). Its name/counts align left; icon maximum 56px desktop/48px compact. Selecting another province changes both icon and label.

- Icon display: maximum 104px on desktop / 80px compact, preserve aspect ratio. Province names: 28px desktop / 24px compact, font-heading (same as player name). Province list scrollbar is visually hidden; wheel/touch scrolling remains enabled.

- Province icons: `province-icons/`, 34 individually generated transparent PNGs, canonical names/order and prompts in `province-icons/manifest.json`. Six-column source sheet ends with two empty cells. Generated originals retained in `references/uploads/province-icons-generated/`; reproduce trimming with `scripts/prepare-province-icons.ps1`. The uploaded 36-icon image was rejected for incorrect identity/order; it is not used to map provinces.

- Frame source (2026-10-13): `../references/uploads/72f80581-6af2-490e-b9fa-fcdf2f104da8.png`. Runtime `province-picker-frame.png`, crop (41,58,1369,953).
- Card source (2026-10-13): `../references/uploads/971d28dd-8350-46e9-a9d0-0b0ac67e38fd.png`. Runtime `province-card.png`, crop (52,113,2069,462). Card content gap4px; icon maximum height80px desktop/56px compact to fit the new artwork ratio. Typography unchanged.
- Reproduce using `scripts/crop-province-picker.ps1`: retain the largest connected alpha>8 artwork component, preserve its RGBA pixels, trim to its bounding box. Remove isolated outside noise; retain original uploads.
- Frame and cards render at their original aspect ratios. Title (font-heading, 30px desktop/20px compact, without province count), close hit area and scrollable API-backed province options remain HTML controls.
