import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AnimatedSection from "./AnimatedSection";
import { ArrowUpRight, Cloud, Shield, Box, Anchor, Blocks, Gitlab, Terminal, GitMerge, Server, Zap, LayoutGrid, Feather, Globe, Utensils, MapPin } from "lucide-react";
import { GithubIcon } from "./Icons";

const skillSvgs = [
  { name: "GitHub", svg: <GithubIcon className="w-full h-full" /> },
  { name: "React", svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-full h-full"><g fill="#61DAFB"><circle cx="64" cy="64" r="11.4"/><path d="M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.8 1.5-7.1 2.1-13.2-.2-22.5-6.6-26.1-1.9-1.1-4-1.6-6.4-1.6-7 0-15.9 5.2-24.9 13.9-9-8.7-17.9-13.9-24.9-13.9-2.4 0-4.5.5-6.4 1.6-6.4 3.7-8.7 13-6.6 26.1.4 2.3.9 4.7 1.5 7.1-2.4.7-4.7 1.4-6.9 2.3C8.2 50 1.4 56.6 1.4 64s6.9 14 19.3 18.8c2.2.8 4.5 1.6 6.9 2.3-.6 2.4-1.1 4.8-1.5 7.1-2.1 13.2.2 22.5 6.6 26.1 1.9 1.1 4 1.6 6.4 1.6 7.1 0 16-5.2 24.9-13.9 9 8.7 17.9 13.9 24.9 13.9 2.4 0 4.5-.5 6.4-1.6 6.4-3.7 8.7-13 6.6-26.1-.4-2.3-.9-4.7-1.5-7.1 2.4-.7 4.7-1.4 6.9-2.3 12.5-4.8 19.3-11.4 19.3-18.8s-6.8-14-19.3-18.8zM92.5 14.7c4.1 2.4 5.5 9.8 3.8 20.3-.3 2.1-.8 4.3-1.4 6.6-5.2-1.2-10.7-2-16.5-2.5-3.4-4.8-6.9-9.1-10.4-13 7.4-7.3 14.9-12.3 21-12.3 1.3 0 2.5.3 3.5.9zM81.3 74c-1.8 3.2-3.9 6.4-6.1 9.6-3.7.3-7.4.4-11.2.4-3.9 0-7.6-.1-11.2-.4-2.2-3.2-4.2-6.4-6-9.6-1.9-3.3-3.7-6.7-5.3-10 1.6-3.3 3.4-6.7 5.3-10 1.8-3.2 3.9-6.4 6.1-9.6 3.7-.3 7.4-.4 11.2-.4 3.9 0 7.6.1 11.2.4 2.2 3.2 4.2 6.4 6 9.6 1.9 3.3 3.7 6.7 5.3 10-1.7 3.3-3.4 6.6-5.3 10zm8.3-3.3c1.5 3.5 2.7 6.9 3.8 10.3-3.4.8-7 1.4-10.8 1.9 1.2-1.9 2.5-3.9 3.6-6 1.2-2.1 2.3-4.2 3.4-6.2zM64 97.8c-2.4-2.6-4.7-5.4-6.9-8.3 2.3.1 4.6.2 6.9.2 2.3 0 4.6-.1 6.9-.2-2.2 2.9-4.5 5.7-6.9 8.3zm-18.6-15c-3.8-.5-7.4-1.1-10.8-1.9 1.1-3.3 2.3-6.8 3.8-10.3 1.1 2 2.2 4.1 3.4 6.1 1.2 2.2 2.4 4.1 3.6 6.1zm-7-25.5c-1.5-3.5-2.7-6.9-3.8-10.3 3.4-.8 7-1.4 10.8-1.9-1.2 1.9-2.5 3.9-3.6 6-1.2 2.1-2.3 4.2-3.4 6.2zM64 30.2c2.4 2.6 4.7 5.4 6.9 8.3-2.3-.1-4.6-.2-6.9-.2-2.3 0-4.6.1-6.9.2 2.2-2.9 4.5-5.7 6.9-8.3zm22.2 21l-3.6-6c3.8.5 7.4 1.1 10.8 1.9-1.1 3.3-2.3 6.8-3.8 10.3-1.1-2.1-2.2-4.2-3.4-6.2zM31.7 35c-1.7-10.5-.3-17.9 3.8-20.3 1-.6 2.2-.9 3.5-.9 6 0 13.5 4.9 21 12.3-3.5 3.8-7 8.2-10.4 13-5.8.5-11.3 1.4-16.5 2.5-.6-2.3-1-4.5-1.4-6.6zM7 64c0-4.7 5.7-9.7 15.7-13.4 2-.8 4.2-1.5 6.4-2.1 1.6 5 3.6 10.3 6 15.6-2.4 5.3-4.5 10.5-6 15.5C15.3 75.6 7 69.6 7 64zm28.5 49.3c-4.1-2.4-5.5-9.8-3.8-20.3.3-2.1.8-4.3 1.4-6.6 5.2 1.2 10.7 2 16.5 2.5 3.4 4.8 6.9 9.1 10.4 13-7.4 7.3-14.9 12.3-21 12.3-1.3 0-2.5-.3-3.5-.9zM96.3 93c1.7 10.5.3 17.9-3.8 20.3-1 .6-2.2.9-3.5.9-6 0-13.5-4.9-21-12.3 3.5-3.8 7-8.2 10.4-13 5.8-.5 11.3-1.4 16.5-2.5.6 2.3 1 4.5 1.4 6.6zm9-15.6c-2 .8-4.2 1.5-6.4 2.1-1.6-5-3.6-10.3-6-15.6 2.4-5.3 4.5-10.5 6-15.5 13.8 4 22.1 10 22.1 15.6 0 4.7-5.8 9.7-15.7 13.4z"/></g></svg> },
  { name: "Node.js", svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-full h-full"><path fill="#83CD29" d="M112.771 30.334L68.674 4.729c-2.781-1.584-6.402-1.584-9.205 0L14.901 30.334C12.031 31.985 10 35.088 10 38.407v51.142c0 3.319 2.084 6.423 4.954 8.083l11.775 6.688c5.628 2.772 7.617 2.772 10.178 2.772 8.333 0 13.093-5.039 13.093-13.828v-50.49c0-.713-.371-1.774-1.071-1.774h-5.623C42.594 41 41 42.061 41 42.773v50.49c0 3.896-3.524 7.773-10.11 4.48L18.723 90.73c-.424-.23-.723-.693-.723-1.181V38.407c0-.482.555-.966.982-1.213l44.424-25.561c.415-.235 1.025-.235 1.439 0l43.882 25.555c.42.253.272.722.272 1.219v51.142c0 .488.183.963-.232 1.198l-44.086 25.576c-.378.227-.847.227-1.261 0l-11.307-6.749c-.341-.198-.746-.269-1.073-.086-3.146 1.783-3.726 2.02-6.677 3.043-.726.253-1.797.692.41 1.929l14.798 8.754a9.294 9.294 0 004.647 1.246c1.642 0 3.25-.426 4.667-1.246l43.885-25.582c2.87-1.672 4.23-4.764 4.23-8.083V38.407c0-3.319-1.36-6.414-4.229-8.073zM77.91 81.445c-11.726 0-14.309-3.235-15.17-9.066-.1-.628-.633-1.379-1.272-1.379h-5.731c-.709 0-1.279.86-1.279 1.566 0 7.466 4.059 16.512 23.453 16.512 14.039 0 22.088-5.455 22.088-15.109 0-9.572-6.467-12.084-20.082-13.886-13.762-1.819-15.16-2.738-15.16-5.962 0-2.658 1.184-6.203 11.374-6.203 9.105 0 12.461 1.954 13.842 8.091.118.577.645.991 1.24.991h5.754c.354 0 .692-.143.94-.396.24-.272.367-.613.335-.979-.891-10.568-7.912-15.493-22.112-15.493-12.631 0-20.166 5.334-20.166 14.275 0 9.698 7.497 12.378 19.622 13.577 14.505 1.422 15.633 3.542 15.633 6.395 0 4.955-3.978 7.066-13.309 7.066z"/></svg> },
  { name: "TypeScript", svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-full h-full"><path fill="#fff" d="M22.67 47h99.67v73.67H22.67z"/><path fill="#007acc" d="M1.5 63.91v62.5h125v-125H1.5zm100.73-5a15.56 15.56 0 017.82 4.5 20.58 20.58 0 013 4c0 .16-5.4 3.81-8.69 5.85-.12.08-.6-.44-1.13-1.23a7.09 7.09 0 00-5.87-3.53c-3.79-.26-6.23 1.73-6.21 5a4.58 4.58 0 00.54 2.34c.83 1.73 2.38 2.76 7.24 4.86 8.95 3.85 12.78 6.39 15.16 10 2.66 4 3.25 10.46 1.45 15.24-2 5.2-6.9 8.73-13.83 9.9a38.32 38.32 0 01-9.52-.1 23 23 0 01-12.72-6.63c-1.15-1.27-3.39-4.58-3.25-4.82a9.34 9.34 0 011.15-.73L82 101l3.59-2.08.75 1.11a16.78 16.78 0 004.74 4.54c4 2.1 9.46 1.81 12.16-.62a5.43 5.43 0 00.69-6.92c-1-1.39-3-2.56-8.59-5-6.45-2.78-9.23-4.5-11.77-7.24a16.48 16.48 0 01-3.43-6.25 25 25 0 01-.22-8c1.33-6.23 6-10.58 12.82-11.87a31.66 31.66 0 019.49.26zm-29.34 5.24v5.12H56.66v46.23H45.15V69.26H28.88v-5a49.19 49.19 0 01.12-5.17C29.08 59 39 59 51 59h21.83z"/></svg> },
  { name: "JavaScript", svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-full h-full"><path fill="#F0DB4F" d="M1.408 1.408h125.184v125.185H1.408z"/><path fill="#323330" d="M116.347 96.736c-.917-5.711-4.641-10.508-15.672-14.981-3.832-1.761-8.104-3.022-9.377-5.926-.452-1.69-.512-2.642-.226-3.665.821-3.32 4.784-4.355 7.925-3.403 2.023.678 3.938 2.237 5.093 4.724 5.402-3.498 5.391-3.475 9.163-5.879-1.381-2.141-2.118-3.129-3.022-4.045-3.249-3.629-7.676-5.498-14.756-5.355l-3.688.477c-3.534.893-6.902 2.748-8.877 5.235-5.926 6.724-4.236 18.492 2.975 23.335 7.104 5.332 17.54 6.545 18.873 11.531 1.297 6.104-4.486 8.08-10.234 7.378-4.236-.881-6.592-3.034-9.139-6.949-4.688 2.713-4.688 2.713-9.508 5.485 1.143 2.499 2.344 3.63 4.26 5.795 9.068 9.198 31.76 8.746 35.83-5.176.165-.478 1.261-3.666.38-8.581zM69.462 58.943H57.753l-.048 30.272c0 6.438.333 12.34-.714 14.149-1.713 3.558-6.152 3.117-8.175 2.427-2.059-1.012-3.106-2.451-4.319-4.485-.333-.584-.583-1.036-.667-1.071l-9.52 5.83c1.583 3.249 3.915 6.069 6.902 7.901 4.462 2.678 10.459 3.499 16.731 2.059 4.082-1.189 7.604-3.652 9.448-7.401 2.666-4.915 2.094-10.864 2.07-17.444.06-10.735.001-21.468.001-32.237z"/></svg> },
  { name: "Next.js", svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-full h-full"><path fill="currentColor" d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64c11.2 0 21.7-2.9 30.8-7.9L48.4 55.3v36.6h-6.8V41.8h6.8l50.5 75.8C116.4 106.2 128 86.5 128 64c0-35.3-28.7-64-64-64zm22.1 84.6l-7.5-11.3V41.8h7.5v42.8z"/></svg> },
  { name: "AWS", svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" fillRule="evenodd" className="w-full h-full">
  <path d="M6.763 11.212c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 01-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 01-.287-.375 6.18 6.18 0 01-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.39-.384-.59-.894-.59-1.533 0-.678.24-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.4 2.4 0 01-.28.104.488.488 0 01-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 01.224-.167 4.577 4.577 0 011.005-.36 4.84 4.84 0 011.246-.151c.95 0 1.644.216 2.091.647.44.43.662 1.085.662 1.963v2.586h.016zm-3.24 1.214c.263 0 .534-.048.822-.144a1.78 1.78 0 00.758-.51 1.27 1.27 0 00.272-.512c.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 00-.735-.136 6.02 6.02 0 00-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 6.726a1.398 1.398 0 01-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 01.32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 01.311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 01-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 01-.303.08h-.687c-.15 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32L12.32 7.747l-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08l-.686.001zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 01-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.32.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 00.415-.758.777.777 0 00-.215-.559c-.144-.151-.416-.287-.807-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 01-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.175 0 .36.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 01.24.2.43.43 0 01.071.263v.375c0 .168-.064.256-.184.256a.83.83 0 01-.303-.096 3.652 3.652 0 00-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.16.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926a2.157 2.157 0 01-.583.703c-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167z" />
  <path d="M.378 15.475c3.384 1.963 7.56 3.153 11.877 3.153 2.914 0 6.114-.607 9.06-1.852.44-.2.814.287.383.607-2.626 1.94-6.442 2.969-9.722 2.969-4.598 0-8.74-1.7-11.87-4.526-.247-.223-.024-.527.272-.351zm23.531-.2c.287.36-.08 2.826-1.485 4.007-.215.184-.423.088-.327-.151l.175-.439c.343-.88.802-2.198.52-2.555-.336-.43-2.22-.207-3.074-.103-.255.032-.295-.192-.063-.36 1.5-1.053 3.967-.75 4.254-.399z" fill="#F90" />
</svg> },
  { name: "Docker", svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#008fe2" className="w-full h-full">
  <path d="M13.98 11.08h2.12a.19.19 0 0 0 .19-.19V9.01a.19.19 0 0 0-.19-.19h-2.12a.18.18 0 0 0-.18.18v1.9c0 .1.08.18.18.18m-2.95-5.43h2.12a.19.19 0 0 0 .18-.19V3.57a.19.19 0 0 0-.18-.18h-2.12a.18.18 0 0 0-.19.18v1.9c0 .1.09.18.19.18m0 2.71h2.12a.19.19 0 0 0 .18-.18V6.29a.19.19 0 0 0-.18-.18h-2.12a.18.18 0 0 0-.19.18v1.89c0 .1.09.18.19.18m-2.93 0h2.12a.19.19 0 0 0 .18-.18V6.29a.18.18 0 0 0-.18-.18H8.1a.18.18 0 0 0-.18.18v1.89c0 .1.08.18.18.18m-2.96 0h2.11a.19.19 0 0 0 .19-.18V6.29a.18.18 0 0 0-.19-.18H5.14a.19.19 0 0 0-.19.18v1.89c0 .1.08.18.19.18m5.89 2.72h2.12a.19.19 0 0 0 .18-.19V9.01a.19.19 0 0 0-.18-.19h-2.12a.18.18 0 0 0-.19.18v1.9c0 .1.09.18.19.18m-2.93 0h2.12a.18.18 0 0 0 .18-.19V9.01a.18.18 0 0 0-.18-.19H8.1a.18.18 0 0 0-.18.18v1.9c0 .1.08.18.18.18m-2.96 0h2.11a.18.18 0 0 0 .19-.19V9.01a.18.18 0 0 0-.18-.19H5.14a.19.19 0 0 0-.19.19v1.88c0 .1.08.19.19.19m-2.92 0h2.12a.18.18 0 0 0 .18-.19V9.01a.18.18 0 0 0-.18-.19H2.22a.18.18 0 0 0-.19.18v1.9c0 .1.08.18.19.18m21.54-1.19c-.06-.05-.67-.51-1.95-.51-.34 0-.68.03-1.01.09a3.77 3.77 0 0 0-1.72-2.57l-.34-.2-.23.33a4.6 4.6 0 0 0-.6 1.43c-.24.97-.1 1.88.4 2.66a4.7 4.7 0 0 1-1.75.42H.76a.75.75 0 0 0-.76.75 11.38 11.38 0 0 0 .7 4.06 6.03 6.03 0 0 0 2.4 3.12c1.18.73 3.1 1.14 5.28 1.14.98 0 1.96-.08 2.93-.26a12.25 12.25 0 0 0 3.82-1.4 10.5 10.5 0 0 0 2.61-2.13c1.25-1.42 2-3 2.55-4.4h.23c1.37 0 2.21-.55 2.68-1 .3-.3.55-.66.7-1.06l.1-.28Z"/>
</svg> },
  { name: "Kubernetes", svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 722.8 702" className="w-full h-full">
  <path style={{fill:"#326ce5", fillOpacity:1, stroke:"#fff", strokeWidth:0, strokeMiterlimit:4, strokeOpacity:1, strokeDasharray:"none"}} d="M365 185a47 46 0 0 0-18 4L103 306a47 46 0 0 0-25 32L18 600a47 46 0 0 0 6 35 47 46 0 0 0 3 4l169 210a47 46 0 0 0 36 18h271a47 46 0 0 0 37-18l169-210a47 46 0 0 0 9-39l-60-263a47 46 0 0 0-26-31L388 189a47 46 0 0 0-23-4z" transform="translate(-6 -175)"/>
  <path d="M368 274c-8 0-15 7-15 16v4l2 14 2 27c-1 3-3 6-5 7v7a190 190 0 0 0-122 58l-6-3c-2 0-5 1-8-1l-20-18-10-10-3-3c-3-2-7-4-10-4-5 0-9 2-12 5-5 7-3 16 4 22l3 3 12 7 22 15c2 2 3 7 3 8l5 5c-26 37-37 84-30 131l-6 2c-2 2-4 6-7 7l-26 4-14 1-4 1c-9 2-14 10-13 18 2 8 11 12 19 11h1v-1h4l13-5c9-4 17-7 25-8l9 3 6-1c15 45 45 82 84 105l-2 7c1 2 2 5 1 8l-13 24-8 11-2 4c-4 8-1 18 6 21 8 4 17 0 20-8l2-4 5-13c3-10 6-20 11-27l6-3 3-6a189 189 0 0 0 135 1l4 5c2 1 5 2 7 5l10 24 4 14 2 4c4 8 13 11 20 8 8-4 10-13 7-21l-2-4-8-12c-6-8-10-15-13-23-1-4 0-6 1-8l-2-6c40-24 70-62 84-106l6 1c2-2 4-4 8-3 8 1 16 4 26 7l13 5 4 1c9 2 17-3 19-10 2-8-4-16-12-18l-5-1-14-1c-10-1-18-2-26-5-3-1-5-5-6-6l-6-2a189 189 0 0 0-31-131l6-5c0-3 0-5 2-8 6-6 13-10 22-16l12-7 4-2c7-6 8-16 3-22s-15-7-22-1l-3 2-10 11c-7 7-13 13-19 17-3 2-7 2-9 1l-6 4c-31-33-75-54-121-58v-7c-2-2-5-3-5-7-1-8 0-16 1-27l2-14v-4c0-9-6-16-14-16zm-19 113-4 77a13 13 0 0 1-21 10l-63-44a151 151 0 0 1 88-43zm37 0c33 5 64 20 88 43l-63 44a13 13 0 0 1-21-10zm-148 71 58 52a13 13 0 0 1-5 22l-74 22c-4-35 4-68 21-96zm259 0a153 153 0 0 1 22 95l-74-21a13 13 0 0 1-5-22h-1l58-52zm-141 56h23l15 18-5 23-21 10-21-10-6-23zm75 62h3l77 13c-12 32-33 59-61 77l-30-72a13 13 0 0 1 11-18zm-128 1a13 13 0 0 1 12 18l-29 71c-27-18-49-44-61-77l76-12h2zm64 31c2-1 4 0 6 1 3 1 5 3 6 5l38 68a154 154 0 0 1-98-1l37-67c3-4 7-6 11-6z" style={{fill:"#fff", fillOpacity:1, stroke:"#fff", strokeWidth:".25", strokeMiterlimit:4, strokeOpacity:1, strokeDasharray:"none"}} transform="translate(-6 -175)"/>
</svg> },
  { name: "Terraform", svg: <Blocks className="w-full h-full text-[#7B42BC]" /> },
  { name: "Azure", svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" className="w-full h-full">
   <circle cx="512" cy="512" r="512" style={{fill:"#0078d4"}}/>
   <path d="M729.08 730.5a33.88 33.88 0 0 0 32.13-44.76L623.89 279.07A33.88 33.88 0 0 0 591.81 256H432.17a33.88 33.88 0 0 0-32.09 23.07L262.8 685.76a33.88 33.88 0 0 0 32.13 44.74h99.16a33.88 33.88 0 0 0 32.11-23.07l20.44-60.49 103.46 76.87a33.85 33.85 0 0 0 20.21 6.69M505.8 468.4 581.6 693a11.29 11.29 0 0 1-10.67 14.91h-.63a11.29 11.29 0 0 1-6.74-2.22L369.32 561.38h101.51m132 146.54a33.54 33.54 0 0 0 .15-22.13L465.77 279.07l-.15-.42h126.21a11.29 11.29 0 0 1 10.71 7.66L739.79 693a11.29 11.29 0 0 1-7.07 14.31" style={{fill:"#fff"}}/>
</svg> },
  { name: "GCP", svg: <Cloud className="w-full h-full text-[#4285F4]" /> },
  { name: "GitLab", svg: <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-labelledby="tanukiHomeDesktop" className="w-full h-full">
  <path d="m31.46 12.78-.04-.12-4.35-11.35A1.14 1.14 0 0 0 25.94.6c-.24 0-.47.1-.66.24-.19.15-.33.36-.39.6l-2.94 9h-11.9l-2.94-9A1.14 1.14 0 0 0 6.07.58a1.15 1.15 0 0 0-1.14.72L.58 12.68l-.05.11a8.1 8.1 0 0 0 2.68 9.34l.02.01.04.03 6.63 4.97 3.28 2.48 2 1.52a1.35 1.35 0 0 0 1.62 0l2-1.52 3.28-2.48 6.67-5h.02a8.09 8.09 0 0 0 2.7-9.36Z" fill="#E24329"/>
  <path d="m31.46 12.78-.04-.12a14.75 14.75 0 0 0-5.86 2.64l-9.55 7.24 6.09 4.6 6.67-5h.02a8.09 8.09 0 0 0 2.67-9.36Z" fill="#FC6D26"/>
  <path d="m9.9 27.14 3.28 2.48 2 1.52a1.35 1.35 0 0 0 1.62 0l2-1.52 3.28-2.48-6.1-4.6-6.07 4.6Z" fill="#FCA326"/>
  <path d="M6.44 15.3a14.71 14.71 0 0 0-5.86-2.63l-.05.12a8.1 8.1 0 0 0 2.68 9.34l.02.01.04.03 6.63 4.97 6.1-4.6-9.56-7.24Z" fill="#FC6D26"/>
</svg> },
  { name: "Security", svg: <Shield className="w-full h-full text-destructive" /> },
  { name: "Linux", svg: <Terminal className="w-full h-full text-foreground" /> },
  { name: "CI/CD", svg: <GitMerge className="w-full h-full text-[#2088FF]" /> },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="px-4 md:px-12 lg:px-20 py-24">
      <AnimatedSection>
        <h2 className="heading-section mb-16">Skills</h2>
      </AnimatedSection>

      <div className="grid grid-cols-12 gap-3 md:gap-4">
        {/* Row 1 */}

        {/* Left info card */}
        <AnimatedSection delay={0.05} className="col-span-12 md:col-span-3">
          <a href="#contact" className="block h-full rounded-2xl bg-card border border-border p-5 md:p-6 flex flex-col justify-between min-h-[200px] transition-all duration-300 hover:shadow-[0_0_15px_hsl(var(--primary)/0.3)] hover:border-primary/40 cursor-pointer group">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1" style={{ fontFamily: "var(--font-body)" }}>A Full Stack & DevSecOps Engineer</p>
              <h3 className="text-2xl md:text-3xl font-black text-foreground leading-tight mb-3" style={{ fontFamily: "var(--font-display)" }}>
                Abdul<br />Mateen
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                Passionate about end-to-end web development, cloud architecture, and secure infrastructure. Building robust and scalable applications.
              </p>
            </div>
            <div className="mt-4">
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center group-hover:bg-primary/80 transition-colors inline-flex">
                <ArrowUpRight size={16} className="text-primary-foreground group-hover:scale-110 transition-transform" />
              </div>
            </div>
          </a>
        </AnimatedSection>

        {/* Full Stack & DevSecOps Components */}
        <AnimatedSection delay={0.1} className="col-span-12 md:col-span-5">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 h-full">
            {[
              { label: "Frontend", desc: "React & UI", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-6 h-6"><g fill="#61DAFB"><circle cx="64" cy="64" r="11.4"/><path d="M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.8 1.5-7.1 2.1-13.2-.2-22.5-6.6-26.1-1.9-1.1-4-1.6-6.4-1.6-7 0-15.9 5.2-24.9 13.9-9-8.7-17.9-13.9-24.9-13.9-2.4 0-4.5.5-6.4 1.6-6.4 3.7-8.7 13-6.6 26.1.4 2.3.9 4.7 1.5 7.1-2.4.7-4.7 1.4-6.9 2.3C8.2 50 1.4 56.6 1.4 64s6.9 14 19.3 18.8c2.2.8 4.5 1.6 6.9 2.3-.6 2.4-1.1 4.8-1.5 7.1-2.1 13.2.2 22.5 6.6 26.1 1.9 1.1 4 1.6 6.4 1.6 7.1 0 16-5.2 24.9-13.9 9 8.7 17.9 13.9 24.9 13.9 2.4 0 4.5-.5 6.4-1.6 6.4-3.7 8.7-13 6.6-26.1-.4-2.3-.9-4.7-1.5-7.1 2.4-.7 4.7-1.4 6.9-2.3 12.5-4.8 19.3-11.4 19.3-18.8s-6.8-14-19.3-18.8z"/></g></svg> },
              { label: "Backend", desc: "Node & APIs", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-6 h-6"><path fill="#83CD29" d="M112.771 30.334L68.674 4.729c-2.781-1.584-6.402-1.584-9.205 0L14.901 30.334C12.031 31.985 10 35.088 10 38.407v51.142c0 3.319 2.084 6.423 4.954 8.083l11.775 6.688c5.628 2.772 7.617 2.772 10.178 2.772 8.333 0 13.093-5.039 13.093-13.828v-50.49c0-.713-.371-1.774-1.071-1.774h-5.623C42.594 41 41 42.061 41 42.773v50.49c0 3.896-3.524 7.773-10.11 4.48L18.723 90.73c-.424-.23-.723-.693-.723-1.181V38.407c0-.482.555-.966.982-1.213l44.424-25.561c.415-.235 1.025-.235 1.439 0l43.882 25.555c.42.253.272.722.272 1.219v51.142c0 .488.183.963-.232 1.198l-44.086 25.576c-.378.227-.847.227-1.261 0l-11.307-6.749c-.341-.198-.746-.269-1.073-.086-3.146 1.783-3.726 2.02-6.677 3.043-.726.253-1.797.692.41 1.929l14.798 8.754a9.294 9.294 0 004.647 1.246c1.642 0 3.25-.426 4.667-1.246l43.885-25.582c2.87-1.672 4.23-4.764 4.23-8.083V38.407c0-3.319-1.36-6.414-4.229-8.073z"/></svg> },
              { label: "Database", desc: "SQL & NoSQL", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-muted-foreground"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg> },
              { label: "Cloud", desc: "AWS, Azure, GCP", icon: <Cloud className="w-6 h-6 text-[#FF9900]" /> },
              { label: "CI/CD & IaC", desc: "Pipelines, Terraform", icon: <GitMerge className="w-6 h-6 text-[#2088FF]" /> },
              { label: "Security", desc: "SAST, DAST, IAM", icon: <Shield className="w-6 h-6 text-destructive" /> },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl bg-card border border-border flex flex-col items-center justify-center aspect-square md:aspect-[4/3] lg:aspect-square transition-all duration-300 p-2 hover:shadow-[0_0_15px_hsl(var(--primary)/0.3)] hover:border-primary/40"
              >
                {item.icon}
                <span className="text-foreground text-[10px] md:text-xs font-semibold mt-1.5" style={{ fontFamily: "var(--font-body)" }}>{item.label}</span>
                <span className="text-muted-foreground text-[8px] md:text-[10px] text-center" style={{ fontFamily: "var(--font-body)" }}>{item.desc}</span>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* "Building Skills For Future" text */}
        <AnimatedSection delay={0.15} className="col-span-12 md:col-span-4">
          <div className="h-full rounded-2xl bg-card border border-border p-6 md:p-8 flex items-center min-h-[200px] transition-all duration-300 hover:shadow-[0_0_15px_hsl(var(--primary)/0.3)] hover:border-primary/40">
            <h3
              className="text-3xl md:text-5xl lg:text-6xl font-black leading-[1.05]"
              style={{ fontFamily: "var(--font-display)", color: "hsl(var(--primary))" }}
            >
              Building Skills<br />For Future.
            </h3>
          </div>
        </AnimatedSection>

        {/* Row 2 */}

        {/* Skills icon grid card */}
        <AnimatedSection delay={0.2} className="col-span-12 md:col-span-4">
          <a href="#skills" className="block h-full rounded-2xl bg-card border border-border p-4 md:p-5 flex flex-col justify-between min-h-[200px] transition-all duration-300 hover:shadow-[0_0_15px_hsl(var(--primary)/0.3)] hover:border-primary/40 cursor-pointer group">
            <div className="grid grid-cols-4 gap-2 mb-4">
              {skillSvgs.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-secondary flex items-center justify-center p-1.5"
                  title={skill.name}
                >
                  {skill.svg}
                </motion.div>
              ))}
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider mb-0.5" style={{ fontFamily: "var(--font-body)" }}>Most Use</p>
                <h3 className="text-lg md:text-xl font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>Skills</h3>
              </div>
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center group-hover:bg-primary/80 transition-colors">
                <ArrowUpRight size={14} className="text-primary-foreground group-hover:scale-110 transition-transform" />
              </div>
            </div>
          </a>
        </AnimatedSection>

        {/* Showcase Projects card */}
        <AnimatedSection delay={0.25} className="col-span-12 md:col-span-4">
          <Link to="/projects" className="block h-full rounded-2xl bg-card border border-border p-4 md:p-5 flex flex-col justify-between min-h-[200px] overflow-hidden relative transition-all duration-300 hover:shadow-[0_0_15px_hsl(var(--primary)/0.3)] hover:border-primary/40 cursor-pointer group">
            <div className="absolute top-3 left-0 right-0 flex justify-center pointer-events-none">
              <span className="text-2xl md:text-4xl font-black uppercase tracking-wider text-muted-foreground/10 whitespace-nowrap" style={{ fontFamily: "var(--font-display)" }}>
                MY WORKS &nbsp; MY WORKS
              </span>
            </div>
            <div className="flex-1 flex items-center justify-center mb-3 relative z-10 w-full pt-4">
              <div className="flex items-center justify-center relative w-full max-w-[280px] md:max-w-[320px]">
                {/* Left Card */}
                <div className="w-[130px] md:w-[160px] rounded-lg border border-border bg-black shadow-xl p-3 md:p-4 z-10 transform -rotate-3 transition-transform hover:rotate-0 hover:z-30">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <Zap size={14} className="text-cyan-400" fill="currentColor" />
                      <span className="text-[10px] md:text-xs font-bold text-white tracking-wide" style={{ fontFamily: "var(--font-display)" }}>Spikelance</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <LayoutGrid size={14} className="text-blue-500" />
                      <span className="text-[10px] md:text-xs font-bold text-white tracking-wide" style={{ fontFamily: "var(--font-display)" }}>TeamFlow</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Utensils size={14} className="text-orange-400" />
                      <span className="text-[10px] md:text-xs font-bold text-white tracking-wide" style={{ fontFamily: "var(--font-display)" }}>Noodost</span>
                    </div>
                  </div>
                </div>
                
                {/* Right Card */}
                <div className="w-[130px] md:w-[160px] rounded-lg border border-border bg-black shadow-xl p-3 md:p-4 z-20 -ml-8 md:-ml-12 mt-8 transform rotate-3 transition-transform hover:rotate-0 hover:z-30">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <Feather size={14} className="text-yellow-400" />
                      <span className="text-[10px] md:text-xs font-bold text-white tracking-wide" style={{ fontFamily: "var(--font-display)" }}>VirtueWear</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe size={14} className="text-pink-400" />
                      <span className="text-[10px] md:text-xs font-bold text-white tracking-wide" style={{ fontFamily: "var(--font-display)" }}>Gloventra</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-green-400" />
                      <span className="text-[10px] md:text-xs font-bold text-white tracking-wide" style={{ fontFamily: "var(--font-display)" }}>HoloPak</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-end justify-between relative z-10">
              <div>
                <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider mb-0.5" style={{ fontFamily: "var(--font-body)" }}>Showcase</p>
                <h3 className="text-lg md:text-xl font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>Projects</h3>
              </div>
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center group-hover:bg-primary/80 transition-colors">
                <ArrowUpRight size={14} className="text-primary-foreground group-hover:scale-110 transition-transform" />
              </div>
            </div>
          </Link>
        </AnimatedSection>

        {/* Tech Stack card */}
        <AnimatedSection delay={0.3} className="col-span-12 md:col-span-4">
          <a href="#skills" className="block h-full rounded-2xl bg-card border border-border p-4 md:p-5 flex flex-col justify-between min-h-[200px] overflow-hidden transition-all duration-300 hover:shadow-[0_0_15px_hsl(var(--primary)/0.3)] hover:border-primary/40 cursor-pointer group">
            <div className="flex-1 flex flex-col items-center justify-center mb-3 gap-3">
              <div className="grid grid-cols-3 gap-2 w-full">
                {[
                  { name: "React", color: "#61DAFB" },
                  { name: "Node.js", color: "#83CD29" },
                  { name: "AWS", color: "#FF9900" },
                  { name: "Next.js", color: "hsl(var(--foreground))" },
                  { name: "MongoDB", color: "#47A248" },
                  { name: "Docker", color: "#2496ED" },
                  { name: "Kubernetes", color: "#326CE5" },
                  { name: "Terraform", color: "#7B42BC" },
                  { name: "TypeScript", color: "#007ACC" },
                ].map((tech, i) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                    whileHover={{ scale: 1.08 }}
                    className="rounded-lg bg-secondary/50 border border-border px-2 py-2 flex items-center justify-center"
                  >
                    <span className="text-[10px] md:text-xs font-semibold" style={{ color: tech.color, fontFamily: "var(--font-body)" }}>{tech.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider mb-0.5" style={{ fontFamily: "var(--font-body)" }}>Expertise</p>
                <h3 className="text-lg md:text-xl font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>Tech Stack</h3>
              </div>
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center group-hover:bg-primary/80 transition-colors">
                <ArrowUpRight size={14} className="text-primary-foreground group-hover:scale-110 transition-transform" />
              </div>
            </div>
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default SkillsSection;
