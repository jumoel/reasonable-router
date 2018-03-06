# Spec for future version

```js
const routeConfig = {
	'/': {
		component: Root,
		name: 'Root',
		routes: {
			'/subpage': { component: Subpage, name: 'Subpage' },
			'/redirect': { redirectTo: '/' },
			'/redirect2': { redirectToRoute: 'Subpage', name: 'SubpageRedirect' },
			'/redirect3': { redirectToRoute: 'SubpageRedirect', permanent: false },
			'/redirect4': { redirectToRoute: 'SubpageRedirect', permanent: true },
			'/redirect5': { redirectTo: '/', permanent: true },
		},
	},
};

const Root = () => (
	<div>
		<h1>Inside root component</h1>
		<RouterMountpoint />
	</div>
);

const Subpage = () => (
	<div>
		<h2>Inside matching subroute</h2>
		<RouterMountpoint />
	</div>
);
```

## Plan

`<RouterMountpoint />` overskriver `context` fra forælder-router, med næste niveau af børneroutes.

En url bliver omdannet til et array af routes. Første <RouterMountpoint> tager 1. nivea route. 2. routermountpoint tager næste niveau. Og så fremdeles indtil der ikke er flere routes. Hvis der er et Routermountpoint men ingen route kastes en fejl. Context skal gøre opmærksom på om der er flere børn. Evt. skal routermountpoint laves om til at tage en funktion som `children` argument, som får `hasChildren` som argument. Dermed kan det besluttes om der skal renderes et placeholder-element eller en under-rute.

Når en route skal resolves trumfer redirects alt. Dvs. matches en redirect som en underrute, starter matching forfra med ny url.

Plan: start med redirects.
Dernæst, lav return af matchRoute om til et array.
Dernæst, lav RouterMountpoint så den supplerer en childcontext, der indeholder match-dybde.
Dernæst, lad RouterMountpoint tage en function som children prop så der kan laves konditioneret rendering baseret på om der er routes eller ej. Dermed undgår man at bringe context ind i ikke-Router-komponenter.
