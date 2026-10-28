import ProductBadge from '../components/ProductBadge.jsx'
import { useAuth } from '../components/authContext.js'
import { useShopping, addWishlistProduct, removeWishlistProducts, addCartProducts } from '../services/wishlistStore.js'
import { saveOrder } from '../services/orderStore.js'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductReviewSummary from '../components/review/ProductReviewSummary.jsx'
import { products } from '../data/products.js'
import { navigateToProducts } from '../utils/productNavigation.js'
import './ProductDetail.css'
import scrubMain from '../assets/product-details/body-scrub-main.png'
import naverPay from '../assets/product-details/naver-pay.png'
import scrubSecondary from '../assets/product-details/body-scrub-secondary.png'
import scrubSecondary2 from '../assets/product-details/body-scrub-secondary-2.png'
import scrubDetail1 from '../assets/product-details/body-scrub-detail-1.png'
import scrubDetail2 from '../assets/product-details/body-scrub-detail-2.png'
import scrubDetail3 from '../assets/product-details/body-scrub-detail-3.png'
import scrubDetail4 from '../assets/product-details/body-scrub-detail-4.png'
import scrubDetail5 from '../assets/product-details/body-scrub-detail-5.png'
import scrubDetail6 from '../assets/product-details/body-scrub-detail-6.png'
import scrubDetail7 from '../assets/product-details/body-scrub-detail-7.png'
import scrubDetail8 from '../assets/product-details/body-scrub-detail-8.png'

import padMain from '../assets/product-details/pad-main.png'
import padSecondary1 from '../assets/product-details/pad-secondary-1.png'
import padSecondary2 from '../assets/product-details/pad-secondary-2.png'
import padSecondary3 from '../assets/product-details/pad-secondary-3.png'
import padDetail1 from '../assets/product-details/pad-detail-1.png'
import padDetail2 from '../assets/product-details/pad-detail-2.png'
import padDetail3 from '../assets/product-details/pad-detail-3.png'
import padDetail4 from '../assets/product-details/pad-detail-4.png'
import padDetail5 from '../assets/product-details/pad-detail-5.png'
import padDetail6 from '../assets/product-details/pad-detail-6.png'
import padDetail7 from '../assets/product-details/pad-detail-7.png'
import padDetail8 from '../assets/product-details/pad-detail-8.png'

import creamMain from '../assets/product-details/cream-main.png'
import creamSecondary1 from '../assets/product-details/cream-secondary-1.png'
import creamSecondary2 from '../assets/product-details/cream-secondary-2.png'
import creamSecondary3 from '../assets/product-details/cream-secondary-3.png'
import creamDetail1 from '../assets/product-details/cream-detail-1.png'
import creamDetail2 from '../assets/product-details/cream-detail-2.png'
import creamDetail3 from '../assets/product-details/cream-detail-3.png'
import creamDetail4 from '../assets/product-details/cream-detail-4.png'
import creamDetail5 from '../assets/product-details/cream-detail-5.png'
import creamDetail6 from '../assets/product-details/cream-detail-6.png'
import creamDetail7 from '../assets/product-details/cream-detail-7.png'

import ampouleMain from '../assets/product-details/ampoule-main.png'
import ampouleSecondary1 from '../assets/product-details/ampoule-secondary-1.png'
import ampouleSecondary2 from '../assets/product-details/ampoule-secondary-2.png'
import ampouleSecondary3 from '../assets/product-details/ampoule-secondary-3.png'
import ampouleDetail1 from '../assets/product-details/ampoule-detail-1.png'
import ampouleDetail2 from '../assets/product-details/ampoule-detail-2.png'
import ampouleDetail3 from '../assets/product-details/ampoule-detail-3.png'
import ampouleDetail4 from '../assets/product-details/ampoule-detail-4.png'
import ampouleDetail5 from '../assets/product-details/ampoule-detail-5.png'
import ampouleDetail6 from '../assets/product-details/ampoule-detail-6.png'
import ampouleDetail7 from '../assets/product-details/ampoule-detail-7.png'

import mistMain from '../assets/product-details/mist-main.png'
import mistSecondary1 from '../assets/product-details/mist-secondary-1.png'
import mistSecondary2 from '../assets/product-details/mist-secondary-2.png'
import mistSecondary3 from '../assets/product-details/mist-secondary-3.png'
import mistDetail1 from '../assets/product-details/mist-detail-1.png'
import mistDetail2 from '../assets/product-details/mist-detail-2.png'
import mistDetail3 from '../assets/product-details/mist-detail-3.png'
import mistDetail4 from '../assets/product-details/mist-detail-4.png'
import mistDetail5 from '../assets/product-details/mist-detail-5.png'
import mistDetail6 from '../assets/product-details/mist-detail-6.png'
import mistDetail7 from '../assets/product-details/mist-detail-7.png'

import tonerMain from '../assets/product-details/toner-main.png'
import tonerSecondary1 from '../assets/product-details/toner-secondary-1.png'
import tonerSecondary2 from '../assets/product-details/toner-secondary-2.png'
import tonerSecondary3 from '../assets/product-details/toner-secondary-3.png'
import tonerDetail1 from '../assets/product-details/toner-detail-1.png'
import tonerDetail2 from '../assets/product-details/toner-detail-2.png'
import tonerDetail3 from '../assets/product-details/toner-detail-3.png'
import tonerDetail4 from '../assets/product-details/toner-detail-4.png'
import tonerDetail5 from '../assets/product-details/toner-detail-5.png'
import tonerDetail6 from '../assets/product-details/toner-detail-6.png'
import tonerDetail7 from '../assets/product-details/toner-detail-7.png'
import tonerDetail8 from '../assets/product-details/toner-detail-8.png'

import maskMain from '../assets/product-details/mask-main.png'
import maskSecondary1 from '../assets/product-details/mask-secondary-1.png'
import maskSecondary2 from '../assets/product-details/mask-secondary-2.png'
import maskSecondary3 from '../assets/product-details/mask-secondary-3.png'
import maskDetail1 from '../assets/product-details/mask-detail-1.png'
import maskDetail2 from '../assets/product-details/mask-detail-2.png'
import maskDetail3 from '../assets/product-details/mask-detail-3.png'
import maskDetail4 from '../assets/product-details/mask-detail-4.png'
import maskDetail5 from '../assets/product-details/mask-detail-5.png'
import maskDetail6 from '../assets/product-details/mask-detail-6.png'
import maskDetail7 from '../assets/product-details/mask-detail-7.png'
import maskDetail8 from '../assets/product-details/mask-detail-8.png'
import maskDetail9 from '../assets/product-details/mask-detail-9.png'

import odiTonerMain from '../assets/product-details/odi-toner-main.png'
import odiTonerSecondary1 from '../assets/product-details/odi-toner-secondary-1-enhanced.png'
import odiTonerSecondary2 from '../assets/product-details/odi-toner-secondary-2-enhanced.png'
import odiTonerSecondary3 from '../assets/product-details/odi-toner-secondary-3-enhanced.png'
import odiTonerDetail1 from '../assets/product-details/odi-toner-detail-1.png'
import odiTonerDetail2 from '../assets/product-details/odi-toner-detail-2.png'
import odiTonerDetail3 from '../assets/product-details/odi-toner-detail-3.png'
import odiTonerDetail4 from '../assets/product-details/odi-toner-detail-4.png'
import odiTonerDetail5 from '../assets/product-details/odi-toner-detail-5.png'
import odiTonerDetail6 from '../assets/product-details/odi-toner-detail-6.png'
import odiTonerDetail7 from '../assets/product-details/odi-toner-detail-7.png'
import odiTonerDetail8 from '../assets/product-details/odi-toner-detail-8.png'

import odiAmpouleMain from '../assets/product-details/odi-ampoule-main.png'
import odiAmpouleSecondary1 from '../assets/product-details/odi-ampoule-secondary-1-square.png'
import odiAmpouleSecondary2 from '../assets/product-details/odi-ampoule-secondary-2-replacement.png'
import odiAmpouleSecondary3 from '../assets/product-details/odi-ampoule-secondary-3.png'
import odiAmpouleDetail1 from '../assets/product-details/odi-ampoule-detail-1.png'
import odiAmpouleDetail2 from '../assets/product-details/odi-ampoule-detail-2.png'
import odiAmpouleDetail3 from '../assets/product-details/odi-ampoule-detail-3.png'
import odiAmpouleDetail4 from '../assets/product-details/odi-ampoule-detail-4.png'
import odiAmpouleDetail5 from '../assets/product-details/odi-ampoule-detail-5.png'
import odiAmpouleDetail6 from '../assets/product-details/odi-ampoule-detail-6.png'
import odiAmpouleDetail7 from '../assets/product-details/odi-ampoule-detail-7.png'
import odiAmpouleDetail8 from '../assets/product-details/odi-ampoule-detail-8.png'

import odiCreamMain from '../assets/product-details/odi-cream-main.png'
import odiCreamSecondary1 from '../assets/product-details/odi-cream-secondary-1-enhanced.png'
import odiCreamSecondary2 from '../assets/product-details/odi-cream-secondary-2-enhanced.png'
import odiCreamSecondary3 from '../assets/product-details/odi-cream-secondary-3-enhanced.png'
import odiCreamDetail1 from '../assets/product-details/odi-cream-detail-1-enhanced.png'
import odiCreamDetail2 from '../assets/product-details/odi-cream-detail-2-enhanced.png'
import odiCreamDetail3 from '../assets/product-details/odi-cream-detail-3-enhanced.png'
import odiCreamDetail4 from '../assets/product-details/odi-cream-detail-4-enhanced.png'
import odiCreamDetail5 from '../assets/product-details/odi-cream-detail-5-enhanced.png'
import odiCreamDetail6 from '../assets/product-details/odi-cream-detail-6-enhanced.png'
import odiCreamDetail7 from '../assets/product-details/odi-cream-detail-7-enhanced.png'
import odiCreamDetail8 from '../assets/product-details/odi-cream-detail-8-enhanced.png'

import odiBalmMain from '../assets/product-details/odi-balm-main.png'
import odiBalmSecondary1 from '../assets/product-details/odi-balm-secondary-1-enhanced.png'
import odiBalmSecondary2 from '../assets/product-details/odi-balm-secondary-2-replacement.png'
import odiBalmSecondary3 from '../assets/product-details/odi-balm-secondary-3-enhanced.png'
import odiBalmDetail1 from '../assets/product-details/odi-balm-detail-1-enhanced.png'
import odiBalmDetail2 from '../assets/product-details/odi-balm-detail-2-enhanced.png'
import odiBalmDetail3 from '../assets/product-details/odi-balm-detail-3-enhanced.png'
import odiBalmDetail4 from '../assets/product-details/odi-balm-detail-4-enhanced.png'
import odiBalmDetail5 from '../assets/product-details/odi-balm-detail-5-enhanced.png'
import odiBalmDetail6 from '../assets/product-details/odi-balm-detail-6-enhanced.png'
import odiBalmDetail7 from '../assets/product-details/odi-balm-detail-7-enhanced.png'

import odiMaskMain from '../assets/product-details/odi-mask-main.png'
import odiMaskSecondary1 from '../assets/product-details/odi-mask-secondary-1.png'
import odiMaskSecondary2 from '../assets/product-details/odi-mask-secondary-2.png'
import odiMaskSecondary3 from '../assets/product-details/odi-mask-secondary-3.png'
import odiMaskDetail1 from '../assets/product-details/odi-mask-detail-1.png'
import odiMaskDetail2 from '../assets/product-details/odi-mask-detail-2.png'
import odiMaskDetail3 from '../assets/product-details/odi-mask-detail-3.png'
import odiMaskDetail4 from '../assets/product-details/odi-mask-detail-4.png'
import odiMaskDetail5 from '../assets/product-details/odi-mask-detail-5.png'
import odiMaskDetail6 from '../assets/product-details/odi-mask-detail-6.png'
import odiMaskDetail7 from '../assets/product-details/odi-mask-detail-7.png'

import vitaminTonerMain from '../assets/product-details/vitamin-toner-main.png'
import vitaminTonerSecondary1 from '../assets/product-details/vitamin-toner-secondary-1-replacement.png'
import vitaminTonerSecondary2 from '../assets/product-details/vitamin-toner-secondary-2.png'
import vitaminTonerSecondary3 from '../assets/product-details/vitamin-toner-secondary-3.png'
import vitaminTonerDetail1 from '../assets/product-details/vitamin-toner-detail-1.png'
import vitaminTonerDetail2 from '../assets/product-details/vitamin-toner-detail-2.png'
import vitaminTonerIngredients from '../assets/product-details/vitamin-toner-ingredients.mp4'
import vitaminTonerHowToUse from '../assets/product-details/vitamin-toner-how-to-use.mp4'
import vitaminTonerDetail4 from '../assets/product-details/vitamin-toner-detail-4.png'
import vitaminTonerDetail5 from '../assets/product-details/vitamin-toner-detail-5.png'
import vitaminCleanserMain from '../assets/product-details/vitamin-cleanser-main.png'
import vitaminCleanserSecondary1 from '../assets/product-details/vitamin-cleanser-secondary-1-white.png'
import vitaminCleanserSecondary2 from '../assets/product-details/vitamin-cleanser-secondary-2.png'
import vitaminCleanserSecondary3 from '../assets/product-details/vitamin-cleanser-secondary-3.png'
import vitaminCleanserDetail1 from '../assets/product-details/vitamin-cleanser-detail-1.png'
import vitaminCleanserDetail2 from '../assets/product-details/vitamin-cleanser-detail-2.png'
import vitaminCleanserHowToUse from '../assets/product-details/vitamin-cleanser-how-to-use.png'
import vitaminCleanserBeforeAfter from '../assets/product-details/vitamin-cleanser-before-after.png'
import vitaminCleanserUsage from '../assets/product-details/vitamin-cleanser-usage.mp4'
import vitaminLotionMain from '../assets/product-details/vitamin-lotion-main.png'
import vitaminLotionSecondary1 from '../assets/product-details/vitamin-lotion-secondary-1-white.png'
import vitaminLotionSecondary2 from '../assets/product-details/vitamin-lotion-secondary-2.png'
import vitaminLotionDetail1 from '../assets/product-details/vitamin-lotion-detail-1.png'
import vitaminLotionDetail2 from '../assets/product-details/vitamin-lotion-detail-2.png'
import vitaminLotionHowToUse from '../assets/product-details/vitamin-lotion-how-to-use.png'
import vitaminLotionBeforeAfter from '../assets/product-details/vitamin-lotion-before-after.png'
import vitaminLotionUsage from '../assets/product-details/vitamin-lotion-usage.mp4'
import vitaminAmpouleMain from '../assets/product-details/vitamin-ampoule-main.png'
import vitaminAmpouleSecondary1 from '../assets/product-details/vitamin-ampoule-secondary-1-white.png'
import vitaminAmpouleSecondary2 from '../assets/product-details/vitamin-ampoule-secondary-2.png'
import vitaminAmpouleDetail1 from '../assets/product-details/vitamin-ampoule-detail-1.png'
import vitaminAmpouleDetail2 from '../assets/product-details/vitamin-ampoule-detail-2.png'
import vitaminAmpouleHowToUse from '../assets/product-details/vitamin-ampoule-how-to-use.png'
import vitaminAmpouleBeforeAfter from '../assets/product-details/vitamin-ampoule-before-after.png'
import vitaminAmpouleUsage from '../assets/product-details/vitamin-ampoule-usage.mp4'
import vitaminEssenceMain from '../assets/product-details/vitamin-essence-main.png'
import vitaminEssenceSecondary1 from '../assets/product-details/vitamin-essence-secondary-1-white.png'
import vitaminEssenceSecondary2 from '../assets/product-details/vitamin-essence-secondary-2.png'
import vitaminEssenceDetail1 from '../assets/product-details/vitamin-essence-detail-1.png'
import vitaminEssenceDetail2 from '../assets/product-details/vitamin-essence-detail-2.png'
import vitaminEssenceHowToUse from '../assets/product-details/vitamin-essence-how-to-use.png'
import vitaminEssenceBeforeAfter from '../assets/product-details/vitamin-essence-before-after.png'
import vitaminEssenceUsage from '../assets/product-details/vitamin-essence-usage.mp4'
import vitaminCreamMain from '../assets/product-details/vitamin-cream-main.png'
import vitaminCreamSecondary1 from '../assets/product-details/vitamin-cream-secondary-1-white.png'
import vitaminCreamSecondary2 from '../assets/product-details/vitamin-cream-secondary-2.png'
import vitaminCreamDetail1 from '../assets/product-details/vitamin-cream-detail-1.png'
import vitaminCreamDetail2 from '../assets/product-details/vitamin-cream-detail-2.png'
import vitaminCreamHowToUse from '../assets/product-details/vitamin-cream-how-to-use.png'
import vitaminCreamBeforeAfter from '../assets/product-details/vitamin-cream-before-after.png'
import vitaminCreamUsage from '../assets/product-details/vitamin-cream-usage.mp4'
import vitaminPadMain from '../assets/product-details/vitamin-pad-main.png'
import vitaminPadSecondary1 from '../assets/product-details/vitamin-pad-secondary-1-white.png'
import vitaminPadSecondary2 from '../assets/product-details/vitamin-pad-secondary-2.png'
import vitaminPadDetail1 from '../assets/product-details/vitamin-pad-detail-1.png'
import vitaminPadDetail2 from '../assets/product-details/vitamin-pad-detail-2.png'
import vitaminPadHowToUse from '../assets/product-details/vitamin-pad-how-to-use.png'
import vitaminPadBeforeAfter from '../assets/product-details/vitamin-pad-before-after.png'
import vitaminPadUsage from '../assets/product-details/vitamin-pad-usage.mp4'
import vitaminMaskMain from '../assets/product-details/vitamin-mask-main.png'
import vitaminMaskSecondary1 from '../assets/product-details/vitamin-mask-secondary-1-white.png'
import vitaminMaskSecondary2 from '../assets/product-details/vitamin-mask-secondary-2.png'
import vitaminMaskDetail1 from '../assets/product-details/vitamin-mask-detail-1.png'
import vitaminMaskDetail2 from '../assets/product-details/vitamin-mask-detail-2.png'
import vitaminMaskHowToUse from '../assets/product-details/vitamin-mask-how-to-use.png'
import vitaminMaskBeforeAfter from '../assets/product-details/vitamin-mask-before-after.png'
import vitaminMaskUsage from '../assets/product-details/vitamin-mask-usage.mp4'
import roseCreamMain from '../assets/product-details/rose-cream-main.png'
import roseCreamSecondary1 from '../assets/product-details/rose-cream-secondary-1.png'
import roseCreamSecondary3 from '../assets/product-details/rose-cream-secondary-3-hires.png'
import roseCreamDetail1 from '../assets/product-details/rose-cream-detail-1.png'
import roseCreamDetail2 from '../assets/product-details/rose-cream-detail-2.png'
import roseCreamDetail3 from '../assets/product-details/rose-cream-detail-3.png'
import roseCreamDetail4 from '../assets/product-details/rose-cream-detail-4.png'
import roseCreamDetail5 from '../assets/product-details/rose-cream-detail-5.png'
import roseCreamDetail6 from '../assets/product-details/rose-cream-detail-6.png'
import roseCreamDetail7 from '../assets/product-details/rose-cream-detail-7.png'
import roseEyecreamMain from '../assets/product-details/rose-eyecream-main.png'
import roseEyecreamSecondary1 from '../assets/product-details/rose-eyecream-secondary-1.png'
import roseEyecreamSecondary2 from '../assets/product-details/rose-eyecream-secondary-2.png'
import roseEyecreamSecondary3 from '../assets/product-details/rose-eyecream-secondary-3-square.png'
import roseEyecreamDetail1 from '../assets/product-details/rose-eyecream-detail-1.png'
import roseEyecreamDetail2 from '../assets/product-details/rose-eyecream-detail-2.png'
import roseEyecreamDetail3 from '../assets/product-details/rose-eyecream-detail-3.png'
import roseEyecreamDetail4 from '../assets/product-details/rose-eyecream-detail-4.png'
import roseEyecreamDetail5 from '../assets/product-details/rose-eyecream-detail-5.png'
import roseEyecreamDetail6 from '../assets/product-details/rose-eyecream-detail-6.png'
import roseEyecreamDetail7 from '../assets/product-details/rose-eyecream-detail-7.png'
import baekmogiAmpouleMain from '../assets/product-details/baekmogi-ampoule-main.png'
import baekmogiAmpouleSecondary1 from '../assets/product-details/baekmogi-ampoule-secondary-1.png'
import baekmogiAmpouleSecondary2 from '../assets/product-details/baekmogi-ampoule-secondary-2.png'
import baekmogiAmpouleSecondary3 from '../assets/product-details/baekmogi-ampoule-secondary-3.png'
import baekmogiAmpouleDetail1 from '../assets/product-details/baekmogi-ampoule-detail-1.png'
import baekmogiAmpouleDetail2 from '../assets/product-details/baekmogi-ampoule-detail-2.png'
import baekmogiAmpouleDetail3 from '../assets/product-details/baekmogi-ampoule-detail-3.png'
import baekmogiAmpouleDetail4 from '../assets/product-details/baekmogi-ampoule-detail-4.png'
import baekmogiAmpouleDetail5 from '../assets/product-details/baekmogi-ampoule-detail-5.png'
import baekmogiAmpouleDetail6 from '../assets/product-details/baekmogi-ampoule-detail-6.png'
import baekmogiAmpouleDetail7 from '../assets/product-details/baekmogi-ampoule-detail-7.png'
import baekmogiAmpouleDetail8 from '../assets/product-details/baekmogi-ampoule-detail-8.png'
import baekmogiAmpouleDetail9 from '../assets/product-details/baekmogi-ampoule-detail-9.png'
import baekmogiAmpouleDetail10 from '../assets/product-details/baekmogi-ampoule-detail-10.png'
import baekmogiAmpouleDetail11 from '../assets/product-details/baekmogi-ampoule-detail-11.png'
import baekmogiAmpouleDetail12 from '../assets/product-details/baekmogi-ampoule-detail-12.png'
import baekmogiAmpouleDetail13 from '../assets/product-details/baekmogi-ampoule-detail-13.png'
import baekmogiPadMain from '../assets/product-details/baekmogi-pad-main.png'
import baekmogiPadSecondary1 from '../assets/product-details/baekmogi-pad-secondary-1-white.png'
import baekmogiPadSecondary2 from '../assets/product-details/baekmogi-pad-secondary-2.png'
import baekmogiPadSecondary3 from '../assets/product-details/baekmogi-pad-secondary-3.png'
import baekmogiPadDetail1 from '../assets/product-details/baekmogi-pad-detail-1.png'
import baekmogiPadDetail2 from '../assets/product-details/baekmogi-pad-detail-2.png'
import baekmogiPadDetail3 from '../assets/product-details/baekmogi-pad-detail-3.png'
import baekmogiPadDetail4 from '../assets/product-details/baekmogi-pad-detail-4.png'
import baekmogiPadDetail5 from '../assets/product-details/baekmogi-pad-detail-5.png'
import baekmogiPadDetail6 from '../assets/product-details/baekmogi-pad-detail-6.png'
import baekmogiCreamMain from '../assets/product-details/baekmogi-cream-main.png'
import baekmogiCreamSecondary1 from '../assets/product-details/baekmogi-cream-secondary-1-white.png'
import baekmogiCreamSecondary2 from '../assets/product-details/baekmogi-cream-secondary-2.png'
import baekmogiCreamSecondary3 from '../assets/product-details/baekmogi-cream-secondary-3.png'
import baekmogiCreamDetail1 from '../assets/product-details/baekmogi-cream-detail-1.png'
import baekmogiCreamDetail2 from '../assets/product-details/baekmogi-cream-detail-2.png'
import baekmogiCreamDetail3 from '../assets/product-details/baekmogi-cream-detail-3.png'
import baekmogiCreamDetail4 from '../assets/product-details/baekmogi-cream-detail-4.png'
import baekmogiCreamDetail5 from '../assets/product-details/baekmogi-cream-detail-5.png'
import baekmogiCreamDetail6 from '../assets/product-details/baekmogi-cream-detail-6.png'
import baekmogiCreamDetail7 from '../assets/product-details/baekmogi-cream-detail-7.png'
import baekmogiCreamDetail8 from '../assets/product-details/baekmogi-cream-detail-8.png'
import baekmogiTonerMain from '../assets/product-details/baekmogi-toner-main.png'
import baekmogiTonerSecondary1 from '../assets/product-details/baekmogi-toner-secondary-1-white.png'
import baekmogiTonerSecondary2 from '../assets/product-details/baekmogi-toner-secondary-2.png'
import baekmogiTonerSecondary3 from '../assets/product-details/baekmogi-toner-secondary-3-hires.png'
import baekmogiTonerDetail1 from '../assets/product-details/baekmogi-toner-detail-1.png'
import baekmogiTonerDetail2 from '../assets/product-details/baekmogi-toner-detail-2.png'
import baekmogiTonerDetail3 from '../assets/product-details/baekmogi-toner-detail-3.png'
import baekmogiTonerDetail4 from '../assets/product-details/baekmogi-toner-detail-4.png'
import baekmogiTonerDetail5 from '../assets/product-details/baekmogi-toner-detail-5.png'
import baekmogiTonerDetail6 from '../assets/product-details/baekmogi-toner-detail-6.png'
import baekmogiTonerDetail7 from '../assets/product-details/baekmogi-toner-detail-7.png'
import baekmogiTonerDetail8 from '../assets/product-details/baekmogi-toner-detail-8.png'
import baekmogiLotionMain from '../assets/product-details/baekmogi-lotion-main.png'
import baekmogiLotionSecondary1 from '../assets/product-details/baekmogi-lotion-secondary-1-white.png'
import baekmogiLotionSecondary2 from '../assets/product-details/baekmogi-lotion-secondary-2.png'
import baekmogiLotionDetail1 from '../assets/product-details/baekmogi-lotion-detail-1.png'
import baekmogiLotionDetail2 from '../assets/product-details/baekmogi-lotion-detail-2.png'
import baekmogiLotionDetail3 from '../assets/product-details/baekmogi-lotion-detail-3.png'
import baekmogiLotionDetail4 from '../assets/product-details/baekmogi-lotion-detail-4.png'
import baekmogiMaskMain from '../assets/product-details/baekmogi-mask-main.png'
import baekmogiMaskSecondary1 from '../assets/product-details/baekmogi-mask-secondary-1-white.png'
import baekmogiMaskSecondary2 from '../assets/product-details/baekmogi-mask-secondary-2.png'
import baekmogiMaskSecondary3 from '../assets/product-details/baekmogi-mask-secondary-3.png'
import baekmogiMaskDetail1 from '../assets/product-details/baekmogi-mask-detail-1.png'
import baekmogiMaskDetail2 from '../assets/product-details/baekmogi-mask-detail-2.png'
import baekmogiMaskDetail3 from '../assets/product-details/baekmogi-mask-detail-3.png'
import baekmogiMaskDetail4 from '../assets/product-details/baekmogi-mask-detail-4.png'
import baekmogiMaskDetail5 from '../assets/product-details/baekmogi-mask-detail-5.png'
import baekmogiMaskDetail6 from '../assets/product-details/baekmogi-mask-detail-6.png'

const baekmogiMaskInfo = {
  name: '백목이 수분 베일 마스크팩, 1매',
  englishName: 'TREMELLA HYDRATION VEIL MASK',
  description: '건조해진 피부에 수분을 채우는 데일리 마스크팩',
}

const baekmogiLotionInfo = {
  englishName: 'TREMELLA DEEP MOISTURE LOTION',
  description: '건조한 피부에 수분을 채우는 데일리 로션',
}

const baekmogiTonerInfo = {
  englishName: 'TREMELLA DEEP MOISTURE TONER',
  description: '건조한 피부에 수분을 채우는 데일리 토너',
}

const baekmogiCreamInfo = {
  name: '백목이 수분 잠금 크림, 50ml',
  englishName: 'TREMELLA MOISTURE HOLDING CREAM',
  description: '건조한 피부에 촉촉한 수분을 머금는 수분크림',
}

const baekmogiPadInfo = {
  name: '백목이 커스텀핏 수분 패드, 100매',
  englishName: 'TREMELLA HYDRATION CUSTOM FIT MOISTURE PAD',
  description: '속이 건조한 피부에 수분을 더하는 패드',
}

const baekmogiAmpouleInfo = {
  englishName: 'Tremella Intensive Hydrating Ampoule',
  description: '푸석해진 피부에 부드럽게 채워주는 데일리 앰플',
}

const roseEyecreamInfo = {
  name: 'PDRN 리페어 로즈 아이크림',
  englishName: 'PDRN REPAIR ROSE EYECREAM',
  description: '건조하고 거칠어진 피부에 촉촉한 편안함을 전하는 크림',
}

const roseCreamInfo = {
  name: 'PDRN 로즈 밸런싱 크림',
  englishName: 'PDRN ROSE BALANCING CREAM',
  description: '건조하고 거칠어진 피부에 촉촉한 탄탄함을 더하는 크림',
}

const vitaminMaskInfo = {
  name: '비타민 C 브라이트닝 마스크팩, 1매',
  englishName: 'ONGYEOL Vitamin C Brightening Mask Pack',
  description: '촉촉한 에센스를 피부에 밀착시켜 맑고 생기 있는 피부로 가꿔주는 마스크팩',
}

const vitaminPadInfo = {
  name: '비타민 C 브라이트닝 토너 패드, 70매',
  englishName: 'ONGYEOL Vitamin C Brightening Toner Pad',
  description: '한 장으로 피부결과 각질을 부드럽게 정돈해 매끈한 피부로 가꿔주는 토너 패드',
}

const vitaminCreamInfo = {
  name: '비타민 C 수분크림, 50ml',
  englishName: 'ONGYEOL Vitamin C Hydrating Cream',
  description: '풍부한 수분감을 부드럽게 채워 촉촉하고 편안한 피부로 가꿔주는 수분크림',
}

const vitaminEssenceInfo = {
  name: '비타민 C 브라이트닝 에센스, 50 mL',
  englishName: 'ONGYEOL Vitamin C Brightening Essence',
  description: '가볍고 촉촉하게 스며들어 투명하고 생기 있는 피부로 가꿔주는 에센스',
}

const vitaminAmpouleInfo = {
  name: '비타민 C 브라이트닝 앰플, 30 mL',
  englishName: 'ONGYEOL Vitamin C Brightening Ampoule',
  description: '비타민 C 성분을 집중적으로 전달해 맑고 생기 있는 피부로 가꿔주는 앰플',
}

const vitaminLotionInfo = {
  englishName: 'ONGYEOL Vitamin C Brightening Lotion',
  description: '산뜻한 보습막으로 수분을 채워 촉촉하고 윤기 있는 피부로 가꿔주는 로션',
}

const money = (value) => `${value.toLocaleString('ko-KR')}원`
const tabs = [['detail', '상세정보'], ['reviews', '리뷰'], ['questions', 'Q&A']]

function DetailTabs({ active }) {
  return <nav className="ongyeol-detail__tabs" aria-label="상품 정보 이동">
    {tabs.map(([id, label]) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined}
      onClick={(event) => { event.preventDefault(); document.getElementById(`product-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }}>{label}</a>)}
  </nav>
}

// Browser zoom can make the CSS viewport wider than the visible browser window.
// Limit this adjustment to the detail body; shared navigation keeps its own rules.
function usesTabletDetailLayout() {
  const viewportWidth = window.innerWidth
  const windowWidth = window.outerWidth || viewportWidth
  const width = Math.min(viewportWidth, windowWidth)
  return width >= 600 && width < 1200
}

function usesMobileDetailLayout() {
  return Math.min(window.innerWidth, window.outerWidth || window.innerWidth) < 600
}

export default function ProductDetail({ productId }) {
  const navigate = useNavigate()
  const { isAuthenticated, enterLogin } = useAuth()
  const { wishlist } = useShopping()
  function purchase(product, quantity, buy = false) {
    if (!isAuthenticated) return enterLogin()
    const items = [{ ...product, quantity }]
    if (buy) { saveOrder(items); navigate('/checkout') }
    else { addCartProducts(items); navigate('/cart') }
  }
  const [tabletLayout, setTabletLayout] = useState(usesTabletDetailLayout)
  const [mobileLayout, setMobileLayout] = useState(usesMobileDetailLayout)
  useEffect(() => {
    const updateLayout = () => {
      setTabletLayout(usesTabletDetailLayout())
      setMobileLayout(usesMobileDetailLayout())
    }
    window.addEventListener('resize', updateLayout)
    return () => window.removeEventListener('resize', updateLayout)
  }, [])
  const sourceProduct = products.find((item) => item.id === productId)
  const isVitaminToner = productId === 'vitamin-c-toner'
  const isVitaminCleanser = productId === 'vitamin-c-cleanser'
  const isVitaminLotion = productId === 'vitamin-c-lotion'
  const isVitaminAmpoule = productId === 'vitamin-c-ampoule'
  const isVitaminEssence = productId === 'vitamin-c-essence'
  const isVitaminCream = productId === 'vitamin-c-cream'
  const isVitaminPad = productId === 'vitamin-c-pad'
  const isVitaminMask = productId === 'vitamin-c-mask'
  const isRoseCream = productId === 'rose-pdrn-balancing-cream'
  const isRoseEyecream = productId === 'rose-pdrn-eyecream'
  const isBaekmogiAmpoule = productId === 'baekmogi-ampoule'
  const isBaekmogiPad = productId === 'baekmogi-pad'
  const isBaekmogiCream = productId === 'baekmogi-cream'
  const isBaekmogiToner = productId === 'baekmogi-toner'
  const isBaekmogiLotion = productId === 'baekmogi-lotion'
  const isBaekmogiMask = productId === 'baekmogi-mask'
  const isOdiMask = productId === 'odi-mask'
  const isOdiBalm = productId === 'odi-cleansing-balm'
  const isOdiCream = productId === 'odi-cream'
  const isOdiAmpoule = productId === 'odi-ampoule'
  const isOdiToner = productId === 'odi-toner'
  const isMask = productId === 'dakyeolmae-mask'
  const isToner = productId === 'dakyeolmae-toner'
  const isMist = productId === 'dakyeolmae-mist'
  const isAmpoule = productId === 'dakyeolmae-ampoule'
  const isCream = productId === 'dakyeolmae-cream'
  const isPad = productId === 'dakyeolmae-pad'
  const product = sourceProduct

  const [imageIndex, setImageIndex] = useState(0)
  const [thumbnailStart, setThumbnailStart] = useState(1)
  const [quantity, setQuantity] = useState(1)
  const galleryTouch = useRef(null)
  const galleryImage = useRef(null)
  const galleryDirection = useRef(1)
  const previousGalleryIndex = useRef(imageIndex)
  useEffect(() => {
    const changed = previousGalleryIndex.current !== imageIndex
    previousGalleryIndex.current = imageIndex
    if (!mobileLayout || !changed || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const image = galleryImage.current
    if (!image) return
    let active = true
    let animation
    const play = () => {
      if (!active) return
      animation = image.animate([
        { translate: `${galleryDirection.current * 8}% 0`, opacity: 0.55 },
        { translate: '0 0', opacity: 1 },
      ], { duration: 420, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' })
    }
    image.decode().then(play, play)
    return () => { active = false; animation?.cancel() }
  }, [imageIndex, mobileLayout])
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [productId])
  if (!product) return <main className="ongyeol-detail"><h1>상품을 찾을 수 없습니다.</h1><button type="button" onClick={() => navigateToProducts('type', '전체', navigate)}>상품 목록으로 돌아가기</button></main>
  const isScrub = product.id === 'dakyeolmae-body-scrub'
  const images = isScrub ? [scrubMain, product.textureImage, scrubSecondary, scrubSecondary2].filter(Boolean) : isPad ? [padMain, padSecondary1, padSecondary2, padSecondary3] : isCream ? [creamMain, creamSecondary1, creamSecondary2, creamSecondary3] : isAmpoule ? [ampouleMain, ampouleSecondary1, ampouleSecondary2, ampouleSecondary3] : isMist ? [mistMain, mistSecondary1, mistSecondary2, mistSecondary3] : isToner ? [tonerMain, tonerSecondary2, tonerSecondary1, tonerSecondary3] : isMask ? [maskMain, maskSecondary3, maskSecondary2, maskSecondary1] : isOdiToner ? [odiTonerMain, odiTonerSecondary1, odiTonerSecondary2, odiTonerSecondary3] : isOdiAmpoule ? [odiAmpouleMain, odiAmpouleSecondary1, odiAmpouleSecondary2, odiAmpouleSecondary3] : isOdiCream ? [odiCreamMain, odiCreamSecondary1, odiCreamSecondary2, odiCreamSecondary3] : isOdiBalm ? [odiBalmMain, odiBalmSecondary1, odiBalmSecondary2, odiBalmSecondary3] : isOdiMask ? [odiMaskMain, odiMaskSecondary1, odiMaskSecondary2, odiMaskSecondary3] : isVitaminToner ? [vitaminTonerMain, vitaminTonerSecondary1, vitaminTonerSecondary2, vitaminTonerSecondary3] : isVitaminCleanser ? [vitaminCleanserMain, vitaminCleanserSecondary1, vitaminCleanserSecondary2, vitaminCleanserSecondary3] : isVitaminLotion ? [vitaminLotionMain, vitaminLotionSecondary1, vitaminLotionSecondary2, vitaminCleanserSecondary3] : isVitaminAmpoule ? [vitaminAmpouleMain, vitaminAmpouleSecondary1, vitaminAmpouleSecondary2, vitaminCleanserSecondary3] : isVitaminEssence ? [vitaminEssenceMain, vitaminEssenceSecondary1, vitaminEssenceSecondary2, vitaminCleanserSecondary3] : isVitaminCream ? [vitaminCreamMain, vitaminCreamSecondary1, vitaminCreamSecondary2, vitaminCleanserSecondary3] : isVitaminPad ? [vitaminPadMain, vitaminPadSecondary1, vitaminPadSecondary2, vitaminCleanserSecondary3] : isVitaminMask ? [vitaminMaskMain, vitaminMaskSecondary1, vitaminMaskSecondary2, vitaminCleanserSecondary3] : isRoseCream ? [roseCreamMain, roseCreamSecondary1, roseCreamDetail2, roseCreamSecondary3] : isRoseEyecream ? [roseEyecreamMain, roseEyecreamSecondary1, roseEyecreamSecondary2, roseEyecreamSecondary3] : isBaekmogiAmpoule ? [baekmogiAmpouleMain, baekmogiAmpouleSecondary1, baekmogiAmpouleSecondary2, baekmogiAmpouleSecondary3] : isBaekmogiPad ? [baekmogiPadMain, baekmogiPadSecondary1, baekmogiPadSecondary2, baekmogiPadSecondary3] : isBaekmogiCream ? [baekmogiCreamMain, baekmogiCreamSecondary1, baekmogiCreamSecondary2, baekmogiCreamSecondary3] : isBaekmogiToner ? [baekmogiTonerMain, baekmogiTonerSecondary1, baekmogiTonerSecondary2, baekmogiTonerSecondary3] : isBaekmogiLotion ? [baekmogiLotionMain, baekmogiLotionSecondary1, baekmogiLotionSecondary2, baekmogiTonerSecondary3] : isBaekmogiMask ? [baekmogiMaskMain, baekmogiMaskSecondary1, baekmogiMaskSecondary2, baekmogiMaskSecondary3] : [product.image, product.textureImage].filter(Boolean)
  const thumbnailIndexes = Array.from({ length: Math.min(3, images.length) }, (_, offset) => thumbnailStart + offset)
  const slideGallery = (direction) => {
    galleryDirection.current = direction
    const nextIndex = (imageIndex + direction + images.length) % images.length
    setImageIndex(nextIndex)
    setThumbnailStart((start) => Math.max(0, Math.min(Math.max(0, images.length - 3), nextIndex < start ? nextIndex : nextIndex >= start + 3 ? nextIndex - 2 : start)))
  }
  const startGallerySwipe = (event) => {
    galleryTouch.current = null
    if (!mobileLayout || event.touches.length !== 1 || event.target.closest('button')) return
    const touch = event.touches[0]
    galleryTouch.current = { id: touch.identifier, x: touch.clientX, y: touch.clientY }
  }
  const moveGallerySwipe = (event) => {
    const start = galleryTouch.current
    if (!start) return
    const touch = Array.from(event.touches).find((item) => item.identifier === start.id)
    if (event.touches.length !== 1 || !touch ||
      (Math.abs(touch.clientY - start.y) > 12 && Math.abs(touch.clientY - start.y) > Math.abs(touch.clientX - start.x))) {
      galleryTouch.current = null
    }
  }
  const endGallerySwipe = (event) => {
    const start = galleryTouch.current
    galleryTouch.current = null
    if (!mobileLayout || !start) return
    const touch = Array.from(event.changedTouches).find((item) => item.identifier === start.id)
    if (!touch) return
    const dx = touch.clientX - start.x
    const dy = touch.clientY - start.y
    const threshold = Math.max(40, event.currentTarget.clientWidth * 0.1)
    if (Math.abs(dx) >= threshold && Math.abs(dx) > Math.abs(dy) * 1.25) {
      slideGallery(dx < 0 ? 1 : -1)
    }
  }
  const detailImages = isScrub ? [scrubDetail1, scrubDetail2, scrubDetail3, scrubDetail4, scrubDetail5, scrubDetail6, scrubDetail7, scrubDetail8] : isPad ? [padDetail1, padDetail2, padDetail3, padDetail4, padDetail5, padDetail6, padDetail7, padDetail8] : isCream ? [creamDetail1, creamDetail2, creamDetail3, creamDetail4, creamDetail5, creamDetail6, creamDetail7] : isAmpoule ? [ampouleDetail1, ampouleDetail2, ampouleDetail3, ampouleDetail4, ampouleDetail5, ampouleDetail6, ampouleDetail7] : isMist ? [mistDetail1, mistDetail2, mistDetail3, mistDetail4, mistDetail5, mistDetail6, mistDetail7] : isToner ? [tonerDetail1, tonerDetail2, tonerDetail3, tonerDetail4, tonerDetail5, tonerDetail6, tonerDetail7, tonerDetail8] : isMask ? [maskDetail1, maskDetail2, maskDetail3, maskDetail4, maskDetail5, maskDetail6, maskDetail7, maskDetail8, maskDetail9] : isOdiToner ? [odiTonerDetail1, odiTonerDetail2, odiTonerDetail3, odiTonerDetail4, odiTonerDetail5, odiTonerDetail6, odiTonerDetail7, odiTonerDetail8] : isOdiAmpoule ? [odiAmpouleDetail1, odiAmpouleDetail2, odiAmpouleDetail3, odiAmpouleDetail4, odiAmpouleDetail5, odiAmpouleDetail6, odiAmpouleDetail7, odiAmpouleDetail8] : isOdiCream ? [odiCreamDetail1, odiCreamDetail2, odiCreamDetail3, odiCreamDetail4, odiCreamDetail5, odiCreamDetail6, odiCreamDetail7, odiCreamDetail8] : isOdiBalm ? [odiBalmDetail1, odiBalmDetail2, odiBalmDetail3, odiBalmDetail4, odiBalmDetail5, odiBalmDetail6, odiBalmDetail7] : isOdiMask ? [odiMaskDetail1, odiMaskDetail2, odiMaskDetail3, odiMaskDetail4, odiMaskDetail5, odiMaskDetail6, odiMaskDetail7] : isVitaminToner ? [vitaminTonerDetail1, vitaminTonerDetail2, vitaminTonerIngredients, vitaminTonerHowToUse, vitaminTonerDetail4, vitaminTonerDetail5] : isVitaminCleanser ? [vitaminCleanserDetail1, vitaminCleanserDetail2, vitaminTonerIngredients, vitaminCleanserUsage, vitaminCleanserHowToUse, vitaminCleanserBeforeAfter] : isVitaminLotion ? [vitaminLotionDetail1, vitaminLotionDetail2, vitaminTonerIngredients, vitaminLotionUsage, vitaminLotionHowToUse, vitaminLotionBeforeAfter] : isVitaminAmpoule ? [vitaminAmpouleDetail1, vitaminAmpouleDetail2, vitaminTonerIngredients, vitaminAmpouleUsage, vitaminAmpouleHowToUse, vitaminAmpouleBeforeAfter] : isVitaminEssence ? [vitaminEssenceDetail1, vitaminEssenceDetail2, vitaminTonerIngredients, vitaminEssenceUsage, vitaminEssenceHowToUse, vitaminEssenceBeforeAfter] : isVitaminCream ? [vitaminCreamDetail1, vitaminCreamDetail2, vitaminTonerIngredients, vitaminCreamUsage, vitaminCreamHowToUse, vitaminCreamBeforeAfter] : isVitaminPad ? [vitaminPadDetail1, vitaminPadDetail2, vitaminTonerIngredients, vitaminPadUsage, vitaminPadHowToUse, vitaminPadBeforeAfter] : isVitaminMask ? [vitaminMaskDetail1, vitaminMaskDetail2, vitaminTonerIngredients, vitaminMaskUsage, vitaminMaskHowToUse, vitaminMaskBeforeAfter] : isRoseCream ? [roseCreamDetail1, roseCreamDetail2, roseCreamDetail3, roseCreamDetail4, roseCreamDetail5, roseCreamDetail6, roseCreamDetail7] : isRoseEyecream ? [roseEyecreamDetail1, roseEyecreamDetail2, roseEyecreamDetail3, roseEyecreamDetail4, roseEyecreamDetail5, roseEyecreamDetail6, roseEyecreamDetail7] : isBaekmogiAmpoule ? [baekmogiAmpouleDetail1, baekmogiAmpouleDetail2, baekmogiAmpouleDetail3, baekmogiAmpouleDetail4, baekmogiAmpouleDetail5, baekmogiAmpouleDetail6, baekmogiAmpouleDetail7, baekmogiAmpouleDetail8, baekmogiAmpouleDetail9, baekmogiAmpouleDetail10, baekmogiAmpouleDetail11, baekmogiAmpouleDetail12, baekmogiAmpouleDetail13] : isBaekmogiPad ? [baekmogiPadDetail1, baekmogiPadDetail2, baekmogiPadDetail3, baekmogiPadDetail4, baekmogiPadDetail5, baekmogiPadDetail6] : isBaekmogiCream ? [baekmogiCreamDetail1, baekmogiCreamDetail2, baekmogiCreamDetail3, baekmogiCreamDetail4, baekmogiCreamDetail5, baekmogiCreamDetail6, baekmogiCreamDetail7, baekmogiCreamDetail8] : isBaekmogiToner ? [baekmogiTonerDetail1, baekmogiTonerDetail2, baekmogiTonerDetail3, baekmogiTonerDetail4, baekmogiTonerDetail5, baekmogiTonerDetail6, baekmogiTonerDetail7, baekmogiTonerDetail8] : isBaekmogiLotion ? [baekmogiTonerDetail1, baekmogiTonerDetail2, baekmogiTonerDetail3, baekmogiLotionDetail1, baekmogiLotionDetail2, baekmogiLotionDetail3, baekmogiTonerDetail7, baekmogiLotionDetail4] : isBaekmogiMask ? [baekmogiMaskDetail1, baekmogiMaskDetail2, baekmogiMaskDetail3, baekmogiMaskDetail4, baekmogiMaskDetail5, baekmogiMaskDetail6] : product.detailImages
  return <main className={`ongyeol-detail${tabletLayout ? ' ongyeol-detail--tablet' : ''}${mobileLayout ? ' ongyeol-detail--mobile' : ''}${isOdiToner ? ' ongyeol-detail--odi-toner' : isOdiAmpoule ? ' ongyeol-detail--odi-ampoule' : isOdiCream ? ' ongyeol-detail--odi-cream' : isOdiBalm ? ' ongyeol-detail--odi-balm' : isOdiMask ? ' ongyeol-detail--odi-mask' : (isVitaminToner || isVitaminCleanser || isVitaminLotion || isVitaminAmpoule || isVitaminEssence || isVitaminCream || isVitaminPad || isVitaminMask) ? ' ongyeol-detail--vitamin-toner' : ''}`} aria-labelledby="product-detail-title">
    <section className="ongyeol-detail__top">
      <div className="ongyeol-detail__gallery"
        onTouchStart={startGallerySwipe} onTouchMove={moveGallerySwipe} onTouchEnd={endGallerySwipe}
        onTouchCancel={() => { galleryTouch.current = null }}>
        <div style={(mobileLayout || isBaekmogiToner || isBaekmogiLotion || isBaekmogiMask) ? { width: '100%', aspectRatio: '1 / 1', overflow: 'hidden' } : { display: 'contents' }}>
        <img ref={galleryImage} className="ongyeol-detail__hero" src={images[imageIndex]} alt={`${product.name} 이미지 ${imageIndex + 1}`} style={(isBaekmogiToner || isBaekmogiLotion || isBaekmogiMask) ? { width: '100%', height: '100%', objectFit: imageIndex === 0 ? 'contain' : 'cover', background: '#fff' } : isBaekmogiAmpoule && imageIndex === 0 ? { objectFit: 'contain', background: '#fff' } : isRoseEyecream && (imageIndex === 0 || imageIndex === 3) ? { objectFit: 'contain', transform: 'scale(1.08)', clipPath: 'inset(3.703704%)' } : isRoseCream && (imageIndex === 2 || imageIndex === 3) ? { objectFit: 'cover', objectPosition: 'center top' } : (isVitaminLotion || isVitaminAmpoule || isVitaminEssence || isVitaminCream || isVitaminPad || isVitaminMask) && imageIndex === 2 ? { objectFit: 'cover', objectPosition: 'center top' } : (isOdiAmpoule || isVitaminToner || isVitaminCleanser || isVitaminLotion || isVitaminAmpoule || isVitaminEssence || isVitaminCream || isVitaminPad || isVitaminMask) && imageIndex === 0 ? { objectFit: 'contain' } : isOdiMask && (imageIndex === 1 || imageIndex === 3) ? { objectFit: 'cover' } : undefined} />
        </div>
        <div className="ongyeol-detail__mobile-pager" role="group" aria-label="상품 이미지 이동">
          <button type="button" aria-label="이전 상품 이미지" onClick={() => slideGallery(-1)}>‹</button>
          <span aria-live="polite">{imageIndex + 1} / {images.length}</span>
          <button type="button" aria-label="다음 상품 이미지" onClick={() => slideGallery(1)}>›</button>
        </div>
        <div className="ongyeol-detail__thumbnails" aria-label="상품 이미지 선택">
          <button className="ongyeol-detail__arrow" type="button" aria-label="이전 이미지" onClick={() => slideGallery(-1)}>‹</button>
          {thumbnailIndexes.map((index) => <button className="ongyeol-detail__thumbnail" key={images[index]} type="button" aria-label={index === 0 ? '대표 이미지 보기' : index === 1 ? '제형 이미지 보기' : `보조 이미지 ${index - 1} 보기`} aria-pressed={imageIndex === index} onClick={() => setImageIndex(index)}><img src={images[index]} alt="" style={(isRoseEyecream || isBaekmogiAmpoule || isBaekmogiToner || isBaekmogiLotion || isBaekmogiMask) && index === 0 ? { objectFit: 'contain', background: '#fff' } : (isVitaminLotion || isVitaminAmpoule || isVitaminEssence || isVitaminCream || isVitaminPad || isVitaminMask) && index === 2 ? { objectFit: 'cover', objectPosition: 'center top' } : isOdiMask && (index === 1 || index === 3) ? { objectFit: 'cover' } : undefined} /></button>)}
          <button className="ongyeol-detail__arrow" type="button" aria-label="다음 이미지" onClick={() => slideGallery(1)}>›</button>
        </div>
      </div>
      <div className="ongyeol-detail__summary">
        {(product.englishName || isScrub) && <p className="ongyeol-detail__english">{product.englishName || 'PAPER MULBERRY PERFUME BODY SCRUB'}</p>}
        <h1 id="product-detail-title">{product.name}</h1>
        {(isScrub || isPad || isCream || isAmpoule || isMist || isToner || isMask || isOdiToner || isOdiAmpoule || isOdiCream || isOdiBalm || isOdiMask || isVitaminToner || isVitaminCleanser || isVitaminLotion || isVitaminAmpoule || isVitaminEssence || isVitaminCream || isVitaminPad || isVitaminMask || isRoseCream || isRoseEyecream || isBaekmogiAmpoule || isBaekmogiPad || isBaekmogiCream || isBaekmogiToner || isBaekmogiLotion || isBaekmogiMask) && <p className="ongyeol-detail__description">{isBaekmogiMask ? baekmogiMaskInfo.description : isBaekmogiLotion ? baekmogiLotionInfo.description : isBaekmogiToner ? baekmogiTonerInfo.description : isBaekmogiCream ? baekmogiCreamInfo.description : isBaekmogiPad ? baekmogiPadInfo.description : isBaekmogiAmpoule ? baekmogiAmpouleInfo.description : isRoseEyecream ? roseEyecreamInfo.description : isRoseCream ? roseCreamInfo.description : isVitaminMask ? vitaminMaskInfo.description : isVitaminPad ? vitaminPadInfo.description : isVitaminCream ? vitaminCreamInfo.description : isVitaminEssence ? vitaminEssenceInfo.description : isVitaminAmpoule ? vitaminAmpouleInfo.description : isVitaminLotion ? vitaminLotionInfo.description : isVitaminCleanser ? '부드러운 거품으로 노폐물을 씻어내 맑고 산뜻한 피부로 가꿔주는 클렌징 폼' : isVitaminToner ? '맑고 생기 있는 피부를 위한 비타민 C 브라이트닝 토너' : isOdiMask ? '촉촉한 수분으로 자극 받은 민감한 피부 진정' : isOdiBalm ? '부드럽게 녹이고 촉촉하게 마무리하는 클렌징' : isOdiCream ? '자극받은 피부를 촉촉하게 감싸 깊은 보습 장벽 형성' : isOdiAmpoule ? '맑고 환한 톤으로 생기있게 빛나는 피부' : isOdiToner ? '가볍고 맑은 수분으로 피부결을 촉촉하게 정돈' : isMask ? '촉촉하고 탄탄한 피부로 가꿔주는 집중 탄력 마스크' : isToner ? '맑은 수분을 채워 피부결을 촉촉하고 투명하게 정돈하는 워터 토너' : isMist ? '미세한 수분 세럼 입자가 피부에 촉촉한 윤기와 탄력을 더해주는 콜라겐 미스트' : isAmpoule ? '촉촉한 수분과 영양을 채워 편안하고 건강한 피부 컨디션 케어' : isCream ? '맑은 윤기와 촉촉한 보습으로 매끄러운 피부결 케어' : isPad ? '맑은 피부결, 촉촉한 수분과 부드러운 결 케어' : <>향기롭게, 더 맑은 하루를 위한 바디 케어</>}</p>}
        <ProductBadge product={product} /><dl className="ongyeol-detail__prices">
          {product.discountPercent > 0 && <><dt>정상가</dt><dd><del>{money(product.originalPrice)}</del></dd></>}

          <dt>판매가</dt><dd><strong>{money(product.price)}</strong>{product.discountPercent > 0 && <span className="ongyeol-detail__discount">{product.discountPercent}%</span>}</dd>
        </dl>
        <p className="ongyeol-detail__shipping"><span>배송비</span>3,000원(50,000원 이상 구매 시 무료)</p>
        <div className="ongyeol-detail__coupon">신규 가입하고 <span>1만원 할인 쿠폰</span>받기</div>
        <div className="ongyeol-detail__quantity">
          <div><button type="button" aria-label="수량 줄이기" disabled={quantity === 1} onClick={() => setQuantity(quantity - 1)}>−</button><input type="number" aria-label="상품 수량" min="1" max="99" value={quantity} onChange={(event) => setQuantity(Math.min(99, Math.max(1, Math.trunc(Number(event.target.value) || 1))))} /><button type="button" aria-label="수량 늘리기" disabled={quantity === 99} onClick={() => setQuantity(quantity + 1)}>+</button></div>
          <strong>{money(product.price * quantity)}</strong>
        </div>
        <p className="ongyeol-detail__total"><span>구매수량 {quantity}개</span><strong>총 {money(product.price * quantity)}</strong></p>
        <div className="ongyeol-detail__purchase"><button type="button" disabled aria-label="N pay"><img src={naverPay} alt="N pay" /></button><button type="button" onClick={() => purchase(product, quantity)}>장바구니</button><button type="button" onClick={() => purchase(product, quantity, true)}>구매하기</button><button type="button" aria-pressed={wishlist.some(p => p.id === product.id)} onClick={() => { if (!isAuthenticated) return enterLogin(); if (wishlist.some(p => p.id === product.id)) removeWishlistProducts([product.id]); else addWishlistProduct(product) }}>찜 {wishlist.some(p => p.id === product.id) ? '♥' : '♡'}</button></div>
        <div className="ongyeol-detail__facts">
          {[['배송안내', '평균 2~3일 이내 도착 예정'], ['교환·반품', '상품 수령 후 7일 이내 신청 가능'], ['결제 안내', '카드·간편결제 이용 가능'], ['고객 안내', '상품 및 배송 관련 문의']].map(([label, text]) => <div className="ongyeol-detail__fact" key={label}><span>{label}</span><span>{text}</span><span aria-hidden="true">›</span></div>)}
        </div>
      </div>
    </section>
    <section id="product-reviews" className="ongyeol-detail__section">
      <DetailTabs active="reviews" />
      <ProductReviewSummary productId={sourceProduct.id} />
    </section>
    <section id="product-detail" className="ongyeol-detail__section">
      <DetailTabs active="detail" />
      {detailImages?.length ? <div className="ongyeol-detail__content">{detailImages.map((src, index) => (isVitaminToner || isVitaminCleanser || isVitaminLotion || isVitaminAmpoule || isVitaminEssence || isVitaminCream || isVitaminPad || isVitaminMask) && src === vitaminTonerIngredients ? <div key={src} style={{ position: 'relative', width: '100%', aspectRatio: '806 / 1440', overflow: 'hidden' }}><video src={src} autoPlay muted loop playsInline aria-label="Vitamin C ingredients" style={{ position: 'absolute', display: 'block', width: '133.995037%', maxWidth: 'none', height: '100%', left: '-16.997519%', top: 0 }} /></div> : isVitaminToner && src === vitaminTonerHowToUse ? <video key={src} src={src} poster={vitaminTonerSecondary2} autoPlay muted loop playsInline aria-label="Vitamin C toner usage" style={{ display: 'block', width: '100%', height: 'auto', margin: 0 }} /> : isVitaminCleanser && src === vitaminCleanserUsage ? <video key={src} src={src} autoPlay muted loop playsInline aria-label="Vitamin C cleansing foam usage" style={{ display: 'block', width: '100%', height: 'auto', margin: 0 }} /> : isVitaminLotion && src === vitaminLotionUsage ? <video key={src} src={src} poster={vitaminLotionSecondary2} autoPlay muted loop playsInline aria-label="Vitamin C lotion usage" style={{ display: 'block', width: '100%', height: 'auto', margin: 0 }} /> : isVitaminAmpoule && src === vitaminAmpouleUsage ? <video key={src} src={src} poster={vitaminAmpouleSecondary2} autoPlay muted loop playsInline aria-label="Vitamin C ampoule usage" style={{ display: 'block', width: '100%', height: 'auto', margin: 0 }} /> : isVitaminEssence && src === vitaminEssenceUsage ? <video key={src} src={src} poster={vitaminEssenceSecondary2} autoPlay muted loop playsInline aria-label="Vitamin C essence usage" style={{ display: 'block', width: '100%', height: 'auto', margin: 0 }} /> : isVitaminCream && src === vitaminCreamUsage ? <video key={src} src={src} poster={vitaminCreamSecondary2} autoPlay muted loop playsInline aria-label="Vitamin C hydrating cream usage" style={{ display: 'block', width: '100%', height: 'auto', margin: 0 }} /> : isVitaminPad && src === vitaminPadUsage ? <video key={src} src={src} poster={vitaminPadSecondary2} autoPlay muted loop playsInline aria-label="Vitamin C toner pad usage" style={{ display: 'block', width: '100%', height: 'auto', margin: 0 }} /> : isVitaminMask && src === vitaminMaskUsage ? <video key={src} src={src} poster={vitaminMaskSecondary2} autoPlay muted loop playsInline aria-label="Vitamin C mask pack usage" style={{ display: 'block', width: '100%', height: 'auto', margin: 0 }} /> : <img key={src} src={src} alt={`${product.name} 상세정보 ${index + 1}`} loading="lazy" />)}</div> : <div className="ongyeol-detail__pending"><h2>상품 상세정보</h2><p>{product.name}</p><p>상세정보 이미지가 준비 중입니다.</p></div>}
    </section>
    <section id="product-questions" className="ongyeol-detail__section">
      <DetailTabs active="questions" />
      <div className="ongyeol-detail__qa-heading"><h2>Q&A</h2><div><button type="button" disabled>문의하기</button><button type="button" disabled>모두보기</button></div></div>
      <div className="ongyeol-detail__qa-empty">게시물이 없습니다.</div>
    </section>
  </main>
}
