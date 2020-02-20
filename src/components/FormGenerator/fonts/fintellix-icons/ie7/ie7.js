/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'fintellix-icons\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-query-closed': '&#xe918;',
		'icon-query-resolved': '&#xe919;',
		'icon-vintage-parameter-editor': '&#xe911;',
		'icon-view-graphs': '&#xe912;',
		'icon-precision-increase': '&#xe913;',
		'icon-precision-decrease': '&#xe914;',
		'icon-maturation-editor': '&#xe915;',
		'icon-exogenous-events-editor': '&#xe916;',
		'icon-create-new-graph': '&#xe917;',
		'icon-import-scenario': '&#xe90d;',
		'icon-new-scenario': '&#xe90e;',
		'icon-view-model-analysis': '&#xe90f;',
		'icon-view-scenario': '&#xe910;',
		'icon-create-folder': '&#xe907;',
		'icon-file-download': '&#xe908;',
		'icon-file-share': '&#xe909;',
		'icon-file-upload': '&#xe90a;',
		'icon-move-path': '&#xe90b;',
		'icon-user-permission': '&#xe90c;',
		'icon-add-comment': '&#xe904;',
		'icon-all-comments-added': '&#xe905;',
		'icon-edit-comment': '&#xe906;',
		'icon-more-alt': '&#xe901;',
		'icon-inbox-alt': '&#xe902;',
		'icon-clock-alt': '&#xe903;',
		'icon-pw-reset': '&#xe900;',
		'icon-3d-rotation': '&#xf101;',
		'icon-airplane-mode-off': '&#xf102;',
		'icon-airplane-mode-on': '&#xf103;',
		'icon-disc': '&#xf104;',
		'icon-store-download': '&#xf105;',
		'icon-profile': '&#xf106;',
		'icon-profile-warning': '&#xf107;',
		'icon-profile-valid': '&#xf108;',
		'icon-tasks': '&#xf109;',
		'icon-profile-import': '&#xf10a;',
		'icon-profile-download': '&#xf10b;',
		'icon-profile-details': '&#xf10c;',
		'icon-attachment': '&#xf10d;',
		'icon-attachment-horizontal': '&#xf10e;',
		'icon-tone': '&#xf10f;',
		'icon-verified': '&#xf110;',
		'icon-wallet': '&#xf111;',
		'icon-bank': '&#xf112;',
		'icon-battery-warning': '&#xf113;',
		'icon-battery-charging': '&#xf114;',
		'icon-battery-indeterminate': '&#xf115;',
		'icon-battery': '&#xf116;',
		'icon-cycle': '&#xf117;',
		'icon-cancel': '&#xf118;',
		'icon-cancel-alternate': '&#xf119;',
		'icon-cruise': '&#xf11a;',
		'icon-bookmark-picture': '&#xf11b;',
		'icon-bookmark-document': '&#xf11c;',
		'icon-bookmark-outline': '&#xf11d;',
		'icon-bookmark-solid': '&#xf11e;',
		'icon-paint-brush': '&#xf11f;',
		'icon-bug': '&#xf120;',
		'icon-bus': '&#xf121;',
		'icon-cake': '&#xf122;',
		'icon-car-taxi': '&#xf123;',
		'icon-car-wash': '&#xf124;',
		'icon-car': '&#xf125;',
		'icon-gift': '&#xf126;',
		'icon-receipt': '&#xf127;',
		'icon-purchase': '&#xf128;',
		'icon-card': '&#xf129;',
		'icon-folio-verfied': '&#xf12a;',
		'icon-folio-download': '&#xf12b;',
		'icon-folio-play': '&#xf12c;',
		'icon-folio': '&#xf12d;',
		'icon-stream-solid': '&#xf12e;',
		'icon-stream-outline': '&#xf12f;',
		'icon-chart-pie': '&#xf130;',
		'icon-chart-bar': '&#xf131;',
		'icon-building-res': '&#xf132;',
		'icon-building-office': '&#xf133;',
		'icon-cancel-outline': '&#xf134;',
		'icon-cancel-solid': '&#xf135;',
		'icon-close': '&#xf136;',
		'icon-drinks': '&#xf137;',
		'icon-grow': '&#xf138;',
		'icon-grow-device': '&#xf139;',
		'icon-move': '&#xf13a;',
		'icon-coffee': '&#xf13b;',
		'icon-collections-bookmark': '&#xf13c;',
		'icon-collections-purchase': '&#xf13d;',
		'icon-collections-folder': '&#xf13e;',
		'icon-collections-image-outline': '&#xf13f;',
		'icon-collections-image-solid': '&#xf140;',
		'icon-collections-one': '&#xf141;',
		'icon-collections-two': '&#xf142;',
		'icon-collections-three': '&#xf143;',
		'icon-collections-four': '&#xf144;',
		'icon-collections-five': '&#xf145;',
		'icon-collections-six': '&#xf146;',
		'icon-collections-seven': '&#xf147;',
		'icon-collections-eight': '&#xf148;',
		'icon-colections-nine-plus': '&#xf149;',
		'icon-collections-nine': '&#xf14a;',
		'icon-collections': '&#xf14b;',
		'icon-collections-songs': '&#xf14c;',
		'icon-collections-pdf': '&#xf14d;',
		'icon-collections-add': '&#xf14e;',
		'icon-collections-sound': '&#xf14f;',
		'icon-collections-details': '&#xf150;',
		'icon-collections-video': '&#xf151;',
		'icon-compass': '&#xf152;',
		'icon-restaurant': '&#xf153;',
		'icon-trash-solid': '&#xf154;',
		'icon-dialpad': '&#xf155;',
		'icon-hdd-nas': '&#xf156;',
		'icon-water': '&#xf157;',
		'icon-edit': '&#xf158;',
		'icon-mail-read': '&#xf159;',
		'icon-mail-unread': '&#xf15a;',
		'icon-hide': '&#xf15b;',
		'icon-show': '&#xf15c;',
		'icon-picker': '&#xf15d;',
		'icon-heart-outline': '&#xf15e;',
		'icon-heart-solid': '&#xf15f;',
		'icon-filter': '&#xf160;',
		'icon-fire': '&#xf161;',
		'icon-flag': '&#xf162;',
		'icon-star': '&#xf163;',
		'icon-flash-auto': '&#xf164;',
		'icon-flash-no': '&#xf165;',
		'icon-flash': '&#xf166;',
		'icon-complete': '&#xf167;',
		'icon-plant': '&#xf168;',
		'icon-flower': '&#xf169;',
		'icon-text': '&#xf16a;',
		'icon-stretch': '&#xf16b;',
		'icon-window-collapse': '&#xf16c;',
		'icon-window-expand': '&#xf16d;',
		'icon-formula': '&#xf16e;',
		'icon-fuel': '&#xf16f;',
		'icon-draw': '&#xf170;',
		'icon-internet': '&#xf171;',
		'icon-connection-secure': '&#xf172;',
		'icon-connection': '&#xf173;',
		'icon-school': '&#xf174;',
		'icon-home': '&#xf175;',
		'icon-chemist': '&#xf176;',
		'icon-add-object': '&#xf177;',
		'icon-bed': '&#xf178;',
		'icon-timer-running': '&#xf179;',
		'icon-timer-outline': '&#xf17a;',
		'icon-timer-solid': '&#xf17b;',
		'icon-url': '&#xf17c;',
		'icon-picture-landscape': '&#xf17d;',
		'icon-picture-outline': '&#xf17e;',
		'icon-picture-solid': '&#xf17f;',
		'icon-inbox': '&#xf180;',
		'icon-colours-remove': '&#xf181;',
		'icon-colours': '&#xf182;',
		'icon-key': '&#xf183;',
		'icon-mark-outline': '&#xf184;',
		'icon-mark-solid': '&#xf185;',
		'icon-tag-design': '&#xf186;',
		'icon-tag': '&#xf187;',
		'icon-shadecard': '&#xf188;',
		'icon-bulb': '&#xf189;',
		'icon-landscape': '&#xf18a;',
		'icon-layers-none': '&#xf18b;',
		'icon-layers': '&#xf18c;',
		'icon-library': '&#xf18d;',
		'icon-link': '&#xf18e;',
		'icon-unlock': '&#xf18f;',
		'icon-lock-outline': '&#xf190;',
		'icon-lock-solid': '&#xf191;',
		'icon-undo-all': '&#xf192;',
		'icon-undo': '&#xf193;',
		'icon-send': '&#xf194;',
		'icon-mall': '&#xf195;',
		'icon-layout': '&#xf196;',
		'icon-settings': '&#xf197;',
		'icon-dollar-cash': '&#xf198;',
		'icon-dollar-none': '&#xf199;',
		'icon-dollar': '&#xf19a;',
		'icon-settings-min': '&#xf19b;',
		'icon-ellipsis': '&#xf19c;',
		'icon-film': '&#xf19d;',
		'icon-movie': '&#xf19e;',
		'icon-tree-man': '&#xf19f;',
		'icon-tree': '&#xf1a0;',
		'icon-pointer': '&#xf1a1;',
		'icon-upload': '&#xf1a2;',
		'icon-goto-link': '&#xf1a3;',
		'icon-pallette': '&#xf1a4;',
		'icon-letter-p': '&#xf1a5;',
		'icon-details-person': '&#xf1a6;',
		'icon-details-objection': '&#xf1a7;',
		'icon-location': '&#xf1a8;',
		'icon-details-unknown': '&#xf1a9;',
		'icon-location-none': '&#xf1aa;',
		'icon-location-pin': '&#xf1ab;',
		'icon-pizza': '&#xf1ac;',
		'icon-band-aid': '&#xf1ad;',
		'icon-power-settings': '&#xf1ae;',
		'icon-power': '&#xf1af;',
		'icon-printer': '&#xf1b0;',
		'icon-puzzle': '&#xf1b1;',
		'icon-quotes': '&#xf1b2;',
		'icon-train': '&#xf1b3;',
		'icon-tear-away': '&#xf1b4;',
		'icon-reset': '&#xf1b5;',
		'icon-reset-error': '&#xf1b6;',
		'icon-reset-none': '&#xf1b7;',
		'icon-reset-alternate': '&#xf1b8;',
		'icon-reset-refresh': '&#xf1b9;',
		'icon-roller': '&#xf1ba;',
		'icon-scale': '&#xf1bb;',
		'icon-scissors': '&#xf1bc;',
		'icon-rotate-lock': '&#xf1bd;',
		'icon-rotate': '&#xf1be;',
		'icon-search-again': '&#xf1bf;',
		'icon-search-document': '&#xf1c0;',
		'icon-search-object': '&#xf1c1;',
		'icon-search-reset': '&#xf1c2;',
		'icon-search': '&#xf1c3;',
		'icon-chair': '&#xf1c4;',
		'icon-settings-object': '&#xf1c5;',
		'icon-settings-gear': '&#xf1c6;',
		'icon-security-verified': '&#xf1c7;',
		'icon-security': '&#xf1c8;',
		'icon-basket': '&#xf1c9;',
		'icon-cart-add': '&#xf1ca;',
		'icon-cart': '&#xf1cb;',
		'icon-go-to': '&#xf1cc;',
		'icon-sort-ascending': '&#xf1cd;',
		'icon-sort-descending': '&#xf1ce;',
		'icon-sort-az': '&#xf1cf;',
		'icon-sort-za': '&#xf1d0;',
		'icon-validate': '&#xf1d1;',
		'icon-storage': '&#xf1d2;',
		'icon-store-24': '&#xf1d3;',
		'icon-store': '&#xf1d4;',
		'icon-metro': '&#xf1d5;',
		'icon-sun': '&#xf1d6;',
		'icon-tab-unselected': '&#xf1d7;',
		'icon-tab-selected': '&#xf1d8;',
		'icon-remark-close': '&#xf1d9;',
		'icon-remark-details': '&#xf1da;',
		'icon-remark': '&#xf1db;',
		'icon-vote-down': '&#xf1dc;',
		'icon-vote': '&#xf1dd;',
		'icon-vote-up': '&#xf1de;',
		'icon-ticket': '&#xf1df;',
		'icon-motion': '&#xf1e0;',
		'icon-wind': '&#xf1e1;',
		'icon-traffic': '&#xf1e2;',
		'icon-translate': '&#xf1e3;',
		'icon-arrow-outline-down': '&#xf1e4;',
		'icon-arrow-outline-up': '&#xf1e5;',
		'icon-truck': '&#xf1e6;',
		'icon-right': '&#xf1e7;',
		'icon-frame': '&#xf1e8;',
		'icon-washer': '&#xf1e9;',
		'icon-window-max': '&#xf1ea;',
		'icon-window-hide': '&#xf1eb;',
		'icon-window-min': '&#xf1ec;',
		'icon-wrench': '&#xf1ed;',
		'icon-zoom-in': '&#xf1ee;',
		'icon-zoom-out': '&#xf1ef;',
		'icon-alert-outline': '&#xf1f0;',
		'icon-alert-solid': '&#xf1f1;',
		'icon-alert-hex': '&#xf1f2;',
		'icon-alert-star': '&#xf1f3;',
		'icon-alert-triangle': '&#xf1f4;',
		'icon-doubt-outline': '&#xf1f5;',
		'icon-doubt-solid': '&#xf1f6;',
		'icon-info-outline': '&#xf1f7;',
		'icon-info-solid': '&#xf1f8;',
		'icon-notification': '&#xf1f9;',
		'icon-notification-add': '&#xf1fa;',
		'icon-notification-outline': '&#xf1fb;',
		'icon-notifictio-cancel': '&#xf1fc;',
		'icon-notification-sleep': '&#xf1fd;',
		'icon-notifiaction-solid': '&#xf1fe;',
		'icon-person-add': '&#xf1ff;',
		'icon-person-mail': '&#xf200;',
		'icon-person-object': '&#xf201;',
		'icon-person-call': '&#xf202;',
		'icon-person-object-solid': '&#xf203;',
		'icon-person-object-calendar': '&#xf204;',
		'icon-person-profile': '&#xf205;',
		'icon-person-outline': '&#xf206;',
		'icon-person-solid': '&#xf207;',
		'icon-person-add-group': '&#xf208;',
		'icon-person-group': '&#xf209;',
		'icon-person-list': '&#xf20a;',
		'icon-person-import': '&#xf20b;',
		'icon-person-team-outline': '&#xf20c;',
		'icon-person-team-solid': '&#xf20d;',
		'icon-person-face': '&#xf20e;',
		'icon-person-female': '&#xf20f;',
		'icon-person-male': '&#xf210;',
		'icon-person-unisex': '&#xf211;',
		'icon-person-stand': '&#xf212;',
		'icon-person-sad': '&#xf213;',
		'icon-person-happy': '&#xf214;',
		'icon-person-run': '&#xf215;',
		'icon-person-walk': '&#xf216;',
		'icon-cloud-object': '&#xf217;',
		'icon-cloud-profile': '&#xf218;',
		'icon-cloud-verified': '&#xf219;',
		'icon-cloud-download': '&#xf21a;',
		'icon-cloud-disconnect': '&#xf21b;',
		'icon-cloud-stylistic': '&#xf21c;',
		'icon-cloud-outline': '&#xf21d;',
		'icon-cloud-upload': '&#xf21e;',
		'icon-cloud-solid': '&#xf21f;',
		'icon-download': '&#xf220;',
		'icon-document-add': '&#xf221;',
		'icon-document-details': '&#xf222;',
		'icon-document': '&#xf223;',
		'icon-folder': '&#xf224;',
		'icon-folder-person': '&#xf225;',
		'icon-folder-star-big': '&#xf226;',
		'icon-golder-star-small': '&#xf227;',
		'icon-folder-solid': '&#xf228;',
		'icon-gif': '&#xf229;',
		'icon-upload-dash': '&#xf22a;',
		'icon-grid': '&#xf22b;',
		'icon-grid-border-bottom': '&#xf22c;',
		'icon-grid-outline': '&#xf22d;',
		'icon-edit-row': '&#xf22e;',
		'icon-grid-divider-h': '&#xf22f;',
		'icon-grid-dividers': '&#xf230;',
		'icon-grid-border-left': '&#xf231;',
		'icon-grid-border-all': '&#xf232;',
		'icon-grid-border-right': '&#xf233;',
		'icon-grid-border-topleft': '&#xf234;',
		'icon-grid-border-top': '&#xf235;',
		'icon-grid-divider-v': '&#xf236;',
		'icon-file-copy': '&#xf237;',
		'icon-arrow-juxtapose': '&#xf238;',
		'icon-align-center': '&#xf239;',
		'icon-align-justify': '&#xf23a;',
		'icon-align-left': '&#xf23b;',
		'icon-align-right': '&#xf23c;',
		'icon-text-bold': '&#xf23d;',
		'icon-text-stagger': '&#xf23e;',
		'icon-text-format-cancel': '&#xf23f;',
		'icon-colour-line': '&#xf240;',
		'icon-colour-clear': '&#xf241;',
		'icon-text-format': '&#xf242;',
		'icon-text-indent-left': '&#xf243;',
		'icon-text-indent-right': '&#xf244;',
		'icon-text-italics': '&#xf245;',
		'icon-text-line-spacing': '&#xf246;',
		'icon-text-bullets': '&#xf247;',
		'icon-text-list': '&#xf248;',
		'icon-margin-right': '&#xf249;',
		'icon-margin-left': '&#xf24a;',
		'icon-text-size': '&#xf24b;',
		'icon-text-strike': '&#xf24c;',
		'icon-text-strike-through': '&#xf24d;',
		'icon-align-justify-parA': '&#xf24e;',
		'icon-text-underline': '&#xf24f;',
		'icon-text-move-down': '&#xf250;',
		'icon-text-align': '&#xf251;',
		'icon-text-move-up': '&#xf252;',
		'icon-redo-arrow': '&#xf253;',
		'icon-center': '&#xf254;',
		'icon-text-space': '&#xf255;',
		'icon-text-format-small': '&#xf256;',
		'icon-arrow-pivot': '&#xf257;',
		'icon-undo-arrow': '&#xf258;',
		'icon-text-reorder': '&#xf259;',
		'icon-chat-alert': '&#xf25a;',
		'icon-chat-details-l': '&#xf25b;',
		'icon-chat-solid-l': '&#xf25c;',
		'icon-chat-edit': '&#xf25d;',
		'icon-chat-picture': '&#xf25e;',
		'icon-chat-tasks': '&#xf25f;',
		'icon-chat-typing': '&#xf260;',
		'icon-chat-outline': '&#xf261;',
		'icon-chat-text': '&#xf262;',
		'icon-chat-details': '&#xf263;',
		'icon-chat-video': '&#xf264;',
		'icon-chat-solid': '&#xf265;',
		'icon-chat-conversation': '&#xf266;',
		'icon-chat-read': '&#xf267;',
		'icon-accepted-line': '&#xf268;',
		'icon-accepted-round': '&#xf269;',
		'icon-accepted-object': '&#xf26a;',
		'icon-chat-delivered': '&#xf26b;',
		'icon-circle': '&#xf26c;',
		'icon-circle-solid': '&#xf26d;',
		'icon-circle-bullseye': '&#xf26e;',
		'icon-radio-selected': '&#xf26f;',
		'icon-circle-cancel': '&#xf270;',
		'icon-circle-cancel-solid': '&#xf271;',
		'icon-cancel-object': '&#xf272;',
		'icon-cancel-minus': '&#xf273;',
		'icon-circle-addto': '&#xf274;',
		'icon-circle-add': '&#xf275;',
		'icon-circle-add-solid': '&#xf276;',
		'icon-square-add': '&#xf277;',
		'icon-add': '&#xf278;',
		'icon-object': '&#xf279;',
		'icon-circle-star': '&#xf27a;',
		'icon-star-half': '&#xf27b;',
		'icon-star-outline': '&#xf27c;',
		'icon-star-solid': '&#xf27d;',
		'icon-bt-connected': '&#xf27e;',
		'icon-bt-off': '&#xf27f;',
		'icon-bt-transmit': '&#xf280;',
		'icon-bt-settings': '&#xf281;',
		'icon-bt': '&#xf282;',
		'icon-camera': '&#xf283;',
		'icon-camera-aperture': '&#xf284;',
		'icon-camera-bw': '&#xf285;',
		'icon-camera-selfie': '&#xf286;',
		'icon-camera-mic': '&#xf287;',
		'icon-camera-reselt': '&#xf288;',
		'icon-camera-selfie-solid': '&#xf289;',
		'icon-camera-film': '&#xf28a;',
		'icon-camera-wide0angle': '&#xf28b;',
		'icon-camera-solid': '&#xf28c;',
		'icon-card-alert': '&#xf28d;',
		'icon-card-not-found': '&#xf28e;',
		'icon-card-solid': '&#xf28f;',
		'icon-card-sim': '&#xf290;',
		'icon-desktop': '&#xf291;',
		'icon-monitor': '&#xf292;',
		'icon-device-hub': '&#xf293;',
		'icon-device-disconnect': '&#xf294;',
		'icon-device-connect': '&#xf295;',
		'icon-device-phone': '&#xf296;',
		'icon-save': '&#xf297;',
		'icon-device-gamepad': '&#xf298;',
		'icon-gps-dot': '&#xf299;',
		'icon-gps-off': '&#xf29a;',
		'icon-gps': '&#xf29b;',
		'icon-headphones-mic': '&#xf29c;',
		'icon-headphones': '&#xf29d;',
		'icon-hub-broadcast': '&#xf29e;',
		'icon-cables': '&#xf29f;',
		'icon-cables-vga': '&#xf2a0;',
		'icon-cables-power': '&#xf2a1;',
		'icon-cables-analog': '&#xf2a2;',
		'icon-keyboard-connect': '&#xf2a3;',
		'icon-keyboard': '&#xf2a4;',
		'icon-laptop': '&#xf2a5;',
		'icon-laptop-mac': '&#xf2a6;',
		'icon-laptop-alternate': '&#xf2a7;',
		'icon-mic-off': '&#xf2a8;',
		'icon-mic-outline': '&#xf2a9;',
		'icon-mic-settings': '&#xf2aa;',
		'icon-mic-solid': '&#xf2ab;',
		'icon-mouse': '&#xf2ac;',
		'icon-signal-alert': '&#xf2ad;',
		'icon-signal-locked': '&#xf2ae;',
		'icon-signal-cancel': '&#xf2af;',
		'icon-signal-outline': '&#xf2b0;',
		'icon-signal-settings': '&#xf2b1;',
		'icon-signal-solid': '&#xf2b2;',
		'icon-phone-bluetooth': '&#xf2b3;',
		'icon-phone-dc': '&#xf2b4;',
		'icon-phone-out': '&#xf2b5;',
		'icon-phone-transmit': '&#xf2b6;',
		'icon-phone-lock': '&#xf2b7;',
		'icon-phone-missed': '&#xf2b8;',
		'icon-phone-chat': '&#xf2b9;',
		'icon-phone-pause': '&#xf2ba;',
		'icon-phone-ring': '&#xf2bb;',
		'icon-phone-settings': '&#xf2bc;',
		'icon-phone-sip': '&#xf2bd;',
		'icon-phone-solid': '&#xf2be;',
		'icon-net-search': '&#xf2bf;',
		'icon-net-off': '&#xf2c0;',
		'icon-net': '&#xf2c1;',
		'icon-radio': '&#xf2c2;',
		'icon-toggle': '&#xf2c3;',
		'icon-phone-broadcast': '&#xf2c4;',
		'icon-tag-broadcast': '&#xf2c5;',
		'icon-router': '&#xf2c6;',
		'icon-router-opp': '&#xf2c7;',
		'icon-phone': '&#xf2c8;',
		'icon-phone-download': '&#xf2c9;',
		'icon-phone-off': '&#xf2ca;',
		'icon-phone-alert': '&#xf2cb;',
		'icon-phone-i': '&#xf2cc;',
		'icon-phone-s-locked': '&#xf2cd;',
		'icon-phone-s': '&#xf2ce;',
		'icon-phone-locked': '&#xf2cf;',
		'icon-phone-locking': '&#xf2d0;',
		'icon-phone-radiate': '&#xf2d1;',
		'icon-phone-more': '&#xf2d2;',
		'icon-phone-d-settings': '&#xf2d3;',
		'icon-phone-s-v': '&#xf2d4;',
		'icon-speaker': '&#xf2d5;',
		'icon-phone-w': '&#xf2d6;',
		'icon-phone-w-i': '&#xf2d7;',
		'icon-phone-w-h': '&#xf2d8;',
		'icon-media-tv-play': '&#xf2d9;',
		'icon-media-details': '&#xf2da;',
		'icon-media-play': '&#xf2db;',
		'icon-media': '&#xf2dc;',
		'icon-usb': '&#xf2dd;',
		'icon-video-off': '&#xf2de;',
		'icon-video-pan': '&#xf2df;',
		'icon-video-solid': '&#xf2e0;',
		'icon-watch': '&#xf2e1;',
		'icon-wifi-ping': '&#xf2e2;',
		'icon-wifi': '&#xf2e3;',
		'icon-wifi-alert': '&#xf2e4;',
		'icon-wifi-lock': '&#xf2e5;',
		'icon-wifi-off': '&#xf2e6;',
		'icon-wifi-outline': '&#xf2e7;',
		'icon-wifi-solid': '&#xf2e8;',
		'icon-arrow-b-l': '&#xf2e9;',
		'icon-arrow-l': '&#xf2ea;',
		'icon-arrow-merge': '&#xf2eb;',
		'icon-arrow-bounce': '&#xf2ec;',
		'icon-arrow-t-r': '&#xf2ed;',
		'icon-arrow-r': '&#xf2ee;',
		'icon-arrow-branch': '&#xf2ef;',
		'icon-arrow-four': '&#xf2f0;',
		'icon-arrow-down-circle': '&#xf2f1;',
		'icon-arrow-down-solid': '&#xf2f2;',
		'icon-arrow-left-circle': '&#xf2f3;',
		'icon-arrow-left': '&#xf2f4;',
		'icon-arrow-right-circle': '&#xf2f5;',
		'icon-arrow-right': '&#xf2f6;',
		'icon-arrow-top-circle': '&#xf2f7;',
		'icon-arrow-top-solid': '&#xf2f8;',
		'icon-arrow-a-down': '&#xf2f9;',
		'icon-arrow-a-left': '&#xf2fa;',
		'icon-arrow-a-right': '&#xf2fb;',
		'icon-arrow-a-top': '&#xf2fc;',
		'icon-arrow-thick-r': '&#xf2fd;',
		'icon-arrow-b': '&#xf2fe;',
		'icon-arrow-t-left': '&#xf2ff;',
		'icon-arrow-enter': '&#xf300;',
		'icon-arrow-t-right': '&#xf301;',
		'icon-arrow-roghtmost': '&#xf302;',
		'icon-arrow-top': '&#xf303;',
		'icon-arrow-rotate-ac': '&#xf304;',
		'icon-arrow-rotate-c': '&#xf305;',
		'icon-arrow-back': '&#xf306;',
		'icon-arrow-forward': '&#xf307;',
		'icon-arrow-download': '&#xf308;',
		'icon-arrow-import': '&#xf309;',
		'icon-arrow-twist': '&#xf30a;',
		'icon-data-circle': '&#xf30b;',
		'icon-data': '&#xf30c;',
		'icon-data-transact': '&#xf30d;',
		'icon-trend-down': '&#xf30e;',
		'icon-trend-steady': '&#xf30f;',
		'icon-trend-up': '&#xf310;',
		'icon-collapse': '&#xf311;',
		'icon-expand': '&#xf312;',
		'icon-apps': '&#xf313;',
		'icon-grid-off': '&#xf314;',
		'icon-grid-focus': '&#xf315;',
		'icon-view-strip': '&#xf316;',
		'icon-view-vertical': '&#xf317;',
		'icon-view-carousel': '&#xf318;',
		'icon-view-strip-v': '&#xf319;',
		'icon-view-blocks': '&#xf31a;',
		'icon-views-masonry': '&#xf31b;',
		'icon-view-dash': '&#xf31c;',
		'icon-view-horizontal': '&#xf31d;',
		'icon-view-headline': '&#xf31e;',
		'icon-view-tasks': '&#xf31f;',
		'icon-view-tasks-big': '&#xf320;',
		'icon-view-array': '&#xf321;',
		'icon-view-compact': '&#xf322;',
		'icon-view-stream': '&#xf323;',
		'icon-view-subtitles': '&#xf324;',
		'icon-view-toc': '&#xf325;',
		'icon-view-layout': '&#xf326;',
		'icon-view-week': '&#xf327;',
		'icon-widgets': '&#xf328;',
		'icon-alarm-set': '&#xf329;',
		'icon-alarm-cancel': '&#xf32a;',
		'icon-alarm-add': '&#xf32b;',
		'icon-alarm-sleep': '&#xf32c;',
		'icon-alarm-clock': '&#xf32d;',
		'icon-calendar-date': '&#xf32e;',
		'icon-calendar-set': '&#xf32f;',
		'icon-calendar-cancel': '&#xf330;',
		'icon-calendar-schedule': '&#xf331;',
		'icon-calendar': '&#xf332;',
		'icon-timer': '&#xf333;',
		'icon-timer-run': '&#xf334;',
		'icon-timer-reset': '&#xf335;',
		'icon-clock-reset': '&#xf336;',
		'icon-clock': '&#xf337;',
		'icon-chrono-cancel': '&#xf338;',
		'icon-chrono': '&#xf339;',
		'icon-ex-d-bug': '&#xf33a;',
		'icon-ex-droid': '&#xf33b;',
		'icon-ex-apple': '&#xf33c;',
		'icon-ex-behance': '&#xf33d;',
		'icon-ex-codepen': '&#xf33e;',
		'icon-ex-dribble': '&#xf33f;',
		'icon-ex-box': '&#xf340;',
		'icon-ex-evernote': '&#xf341;',
		'icon-ex-fb-solid': '&#xf342;',
		'icon-ex-fb-two': '&#xf343;',
		'icon-ex-github-object': '&#xf344;',
		'icon-ex-github-two': '&#xf345;',
		'icon-ex-gdrive': '&#xf346;',
		'icon-ex-g-earth': '&#xf347;',
		'icon-ex-g-apps': '&#xf348;',
		'icon-ex-g-map': '&#xf349;',
		'icon-ex-g-pages': '&#xf34a;',
		'icon-ex-g-play': '&#xf34b;',
		'icon-ex-g-plus-solid': '&#xf34c;',
		'icon-ex-g-plus-small': '&#xf34d;',
		'icon-ex-g': '&#xf34e;',
		'icon-ex-insta': '&#xf34f;',
		'icon-ex-html-3': '&#xf350;',
		'icon-ex-html-5': '&#xf351;',
		'icon-ex-js': '&#xf352;',
		'icon-ex-python': '&#xf353;',
		'icon-ex-python-two': '&#xf354;',
		'icon-ex-lastfm': '&#xf355;',
		'icon-ex-linkedin-solid': '&#xf356;',
		'icon-ex-p': '&#xf357;',
		'icon-ex-pinterest-solid': '&#xf358;',
		'icon-ex-pocket': '&#xf359;',
		'icon-ex-polymer': '&#xf35a;',
		'icon-ex-share': '&#xf35b;',
		'icon-ex-stackoverflow': '&#xf35c;',
		'icon-ex-steam-solid': '&#xf35d;',
		'icon-ex-steam': '&#xf35e;',
		'icon-ex-twitter-solid': '&#xf35f;',
		'icon-uniF360': '&#xf360;',
		'icon-ex-vk': '&#xf361;',
		'icon-ex-wiki': '&#xf362;',
		'icon-ex-windows': '&#xf363;',
		'icon-uniF364': '&#xf364;',
		'icon-af': '&#xf365;',
		'icon-af-circle': '&#xf366;',
		'icon-af-stream': '&#xf367;',
		'icon-af-cancel': '&#xf368;',
		'icon-af0center': '&#xf369;',
		'icon-night-moon': '&#xf36a;',
		'icon-night': '&#xf36b;',
		'icon-light-moon': '&#xf36c;',
		'icon-light-sun': '&#xf36d;',
		'icon-light-ambient': '&#xf36e;',
		'icon-light-art': '&#xf36f;',
		'icon-light-auto': '&#xf370;',
		'icon-light-object': '&#xf371;',
		'icon-error': '&#xf372;',
		'icon-focus': '&#xf373;',
		'icon-focus-outline': '&#xf374;',
		'icon-filter-bw': '&#xf375;',
		'icon-aspect-1': '&#xf376;',
		'icon-aspect-2': '&#xf377;',
		'icon-aspect-3': '&#xf378;',
		'icon-aspect-4': '&#xf379;',
		'icon-aspect-5': '&#xf37a;',
		'icon-aspect-auto': '&#xf37b;',
		'icon-aspect-6': '&#xf37c;',
		'icon-aspect-7': '&#xf37d;',
		'icon-aspect-8': '&#xf37e;',
		'icon-exposure': '&#xf37f;',
		'icon-exposure-alt': '&#xf380;',
		'icon-uniF381': '&#xf381;',
		'icon-focus-small': '&#xf382;',
		'icon-uniF383': '&#xf383;',
		'icon-filter-circle': '&#xf384;',
		'icon-gradient': '&#xf385;',
		'icon-specks': '&#xf386;',
		'icon-graphic-eq': '&#xf387;',
		'icon-hdr-off': '&#xf388;',
		'icon-hdr-strong': '&#xf389;',
		'icon-hdr-weak': '&#xf38a;',
		'icon-hdr': '&#xf38b;',
		'icon-iridiscent': '&#xf38c;',
		'icon-leak-off': '&#xf38d;',
		'icon-leak': '&#xf38e;',
		'icon-looks': '&#xf38f;',
		'icon-loupe': '&#xf390;',
		'icon-panaroma': '&#xf391;',
		'icon-panaroma-v': '&#xf392;',
		'icon-panaroma-w': '&#xf393;',
		'icon-thumbnail': '&#xf394;',
		'icon-thumbnails-small': '&#xf395;',
		'icon-pic-in-pic': '&#xf396;',
		'icon-play-object': '&#xf397;',
		'icon-texture': '&#xf398;',
		'icon-contrast': '&#xf399;',
		'icon-fish-eye': '&#xf39a;',
		'icon-wv-auto': '&#xf39b;',
		'icon-eject-alt': '&#xf39c;',
		'icon-eject': '&#xf39d;',
		'icon-equalizer': '&#xf39e;',
		'icon-next': '&#xf39f;',
		'icon-previous': '&#xf3a0;',
		'icon-jump-f-10': '&#xf3a1;',
		'icon-jump-f-30': '&#xf3a2;',
		'icon-jump-f-5': '&#xf3a3;',
		'icon-hearing': '&#xf3a4;',
		'icon-pause-circle': '&#xf3a5;',
		'icon-pause-circle-solid': '&#xf3a6;',
		'icon-pause': '&#xf3a7;',
		'icon-play-circle': '&#xf3a8;',
		'icon-play-circle-solid': '&#xf3a9;',
		'icon-play': '&#xf3aa;',
		'icon-tracklist': '&#xf3ab;',
		'icon-tracklist-add': '&#xf3ac;',
		'icon-rpt-this': '&#xf3ad;',
		'icon-rpt-all': '&#xf3ae;',
		'icon-jump-b-10': '&#xf3af;',
		'icon-jump-b-30': '&#xf3b0;',
		'icon-jump-b-5': '&#xf3b1;',
		'icon-jump-b': '&#xf3b2;',
		'icon-shuffle': '&#xf3b3;',
		'icon-jump-front': '&#xf3b4;',
		'icon-jump-back': '&#xf3b5;',
		'icon-stop': '&#xf3b6;',
		'icon-surround-sound': '&#xf3b7;',
		'icon-tune': '&#xf3b8;',
		'icon-voulme-d': '&#xf3b9;',
		'icon-volume-z': '&#xf3ba;',
		'icon-volume-mute': '&#xf3bb;',
		'icon-volume-u': '&#xf3bc;',
		'icon-one': '&#xf3bd;',
		'icon-two': '&#xf3be;',
		'icon-three': '&#xf3bf;',
		'icon-four': '&#xf3c0;',
		'icon-five': '&#xf3c1;',
		'icon-six': '&#xf3c2;',
		'icon-one-minus': '&#xf3c3;',
		'icon-two-minus': '&#xf3c4;',
		'icon-one-plus': '&#xf3c5;',
		'icon-two-plus': '&#xf3c6;',
		'icon-ten-seconds': '&#xf3c7;',
		'icon-three-seconds': '&#xf3c8;',
		'icon-zero': '&#xf3c9;',
		'icon-seat-angled': '&#xf3ca;',
		'icon-seat-flat': '&#xf3cb;',
		'icon-seat-bed': '&#xf3cc;',
		'icon-leg-room-m': '&#xf3cd;',
		'icon-leg-room-a': '&#xf3ce;',
		'icon-leg-room-b': '&#xf3cf;',
		'icon-recline-e': '&#xf3d0;',
		'icon-recline-n': '&#xf3d1;',
		'icon-airplay': '&#xf3d2;',
		'icon-closed-caption': '&#xf3d3;',
		'icon-conf-no': '&#xf3d4;',
		'icon-work-board': '&#xf3d5;',
		'icon-disc-alert': '&#xf3d6;',
		'icon-explicit': '&#xf3d7;',
		'icon-land': '&#xf3d8;',
		'icon-take-off': '&#xf3d9;',
		'icon-object-eject': '&#xf3da;',
		'icon-object-load': '&#xf3db;',
		'icon-trinitron': '&#xf3dc;',
		'icon-hd': '&#xf3dd;',
		'icon-hq': '&#xf3de;',
		'icon-postbox': '&#xf3df;',
		'icon-chip': '&#xf3e0;',
		'icon-nfc': '&#xf3e1;',
		'icon-fill': '&#xf3e2;',
		'icon-battery-dc': '&#xf3e3;',
		'icon-rect-up': '&#xf3e4;',
		'icon-photo': '&#xf3e5;',
		'icon-wifi-phone': '&#xf3e6;',
		'icon-phone-vibrate': '&#xf3e7;',
		'icon-voice-mail': '&#xf3e8;',
		'icon-object-details': '&#xf3e9;',
		'icon-wifi-alt': '&#xf3ea;',
		'icon-shapes': '&#xf3eb;',
		'icon-loading': '&#xf3ec;',
		'icon-objects': '&#xf3ed;',
		'icon-ex-500': '&#xf3ee;',
		'icon-ex-8tracks': '&#xf3ef;',
		'icon-ex-amazon': '&#xf3f0;',
		'icon-ex-blogger': '&#xf3f1;',
		'icon-ex-foursquare': '&#xf3f2;',
		'icon-ex-discuss': '&#xf3f3;',
		'icon-ex-no': '&#xf3f4;',
		'icon-ex-dots': '&#xf3f5;',
		'icon-ex-github': '&#xf3f6;',
		'icon-ex-google': '&#xf3f7;',
		'icon-ex-linkedin': '&#xf3f8;',
		'icon-ex-atlas': '&#xf3f9;',
		'icon-ex-outlook': '&#xf3fa;',
		'icon-ex-paypal': '&#xf3fb;',
		'icon-ex-pinterest': '&#xf3fc;',
		'icon-ex-ps': '&#xf3fd;',
		'icon-ex-reddit': '&#xf3fe;',
		'icon-ex-skype': '&#xf3ff;',
		'icon-ex-myspace': '&#xf400;',
		'icon-ex-soundcloud': '&#xf401;',
		'icon-ex-twitter': '&#xf402;',
		'icon-ex-twitch': '&#xf403;',
		'icon-ex-vimeo': '&#xf404;',
		'icon-ex-whatsapp': '&#xf405;',
		'icon-ex-xbox': '&#xf406;',
		'icon-ex-yahoo': '&#xf407;',
		'icon-ex-play': '&#xf408;',
		'icon-ex-youtube': '&#xf409;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
