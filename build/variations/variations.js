(()=>{"use strict";const e=window.wp.blocks,t=window.wp.i18n,r="gatherpress-add-to-calendar",a={title:(0,t.__)("Add to calendar","gatherpress")+" (v2)",description:(0,t.__)("Allows a user to add an event to their preferred calendar.","gatherpress"),category:"gatherpress",icon:"nametag"},o={tagName:"button",title:(0,t.__)("Allows you to add an event to your preferred calendar.","gatherpress"),text:"📅 "+(0,t.__)("Add to Calendar","gatherpress")+" (v2)",className:"gp-add-to-calendar"};(0,e.registerBlockVariation)("core/button",{...a,name:r,isActive:["namespace","title"],attributes:{...o},scope:["inserter","transform","block"],example:{}}),(0,e.registerBlockVariation)("core/buttons",{...a,name:"pseudo-"+r,innerBlocks:[["core/button",{...o}]],example:{innerBlocks:[{name:"core/button",attributes:{...o}}]}})})();