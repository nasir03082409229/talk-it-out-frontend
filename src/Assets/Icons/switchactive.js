export default `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="80" height="40" viewBox="0 0 80 50">
<defs>
  <filter id="Ellipse_1" x="9" y="0" width="69" height="68" filterUnits="userSpaceOnUse">
    <feOffset input="SourceAlpha"/>
    <feGaussianBlur stdDeviation="8" result="blur"/>
    <feFlood flood-opacity="0.02"/>
    <feComposite operator="in" in2="blur"/>
    <feComposite in="SourceGraphic"/>
  </filter>
</defs>
<g id="Toggle" transform="translate(0 21)">
  <g id="Toggle-2" data-name="Toggle">
    <rect id="Rectangle_2" data-name="Rectangle 2" width="59" height="26" rx="13" fill="#e8e8e8"/>
    <g transform="matrix(1, 0, 0, 1, 0, -21)" filter="url(#Ellipse_1)">
      <ellipse id="Ellipse_1-2" data-name="Ellipse 1" cx="10.5" cy="10" rx="10.5" ry="10" transform="translate(33 24)" fill="#380770"/>
    </g>
  </g>
</g>
</svg>
`