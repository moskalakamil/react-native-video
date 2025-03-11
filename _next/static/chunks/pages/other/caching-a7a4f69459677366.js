(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[79],{6745:function(e,i,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/other/caching",function(){return n(1393)}])},1393:function(e,i,n){"use strict";n.r(i),n.d(i,{__toc:function(){return d}});var s=n(5893),c=n(2673),t=n(2643);let d=[{depth:2,value:"Android",id:"android"},{depth:2,value:"iOS",id:"ios"},{depth:3,value:"Technology",id:"technology"},{depth:3,value:"How It Works",id:"how-it-works"},{depth:3,value:"Restrictions",id:"restrictions"}];function h(e){let i=Object.assign({h1:"h1",p:"p",code:"code",h2:"h2",h3:"h3",a:"a"},(0,t.a)(),e.components);return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(i.h1,{children:"Caching"}),"\n",(0,s.jsxs)(i.p,{children:["Caching is supported on ",(0,s.jsx)(i.code,{children:"iOS"})," platforms with a CocoaPods setup and on ",(0,s.jsx)(i.code,{children:"Android"})," using ",(0,s.jsx)(i.code,{children:"SimpleCache"}),"."]}),"\n",(0,s.jsx)(i.h2,{id:"android",children:"Android"}),"\n",(0,s.jsxs)(i.p,{children:["Android uses an LRU ",(0,s.jsx)(i.code,{children:"SimpleCache"})," with a variable cache size, which can be specified by ",(0,s.jsx)(i.code,{children:"bufferConfig - cacheSizeMB"}),". This creates a folder named ",(0,s.jsx)(i.code,{children:"RNVCache"})," inside the app's ",(0,s.jsx)(i.code,{children:"cache"})," directory."]}),"\n",(0,s.jsxs)(i.p,{children:["Note that ",(0,s.jsx)(i.code,{children:"react-native-video"})," does not currently offer a native method to flush the cache, but it can be cleared by manually clearing the app's cache."]}),"\n",(0,s.jsx)(i.p,{children:"Additionally, this resolves the issue in RNV6 where the source URI was repeatedly called when looping a video on Android."}),"\n",(0,s.jsx)(i.h2,{id:"ios",children:"iOS"}),"\n",(0,s.jsx)(i.h3,{id:"technology",children:"Technology"}),"\n",(0,s.jsxs)(i.p,{children:["The cache is backed by ",(0,s.jsx)(i.a,{href:"https://github.com/spotify/SPTPersistentCache",children:"SPTPersistentCache"})," and ",(0,s.jsx)(i.a,{href:"https://github.com/vdugnist/DVAssetLoaderDelegate",children:"DVAssetLoaderDelegate"}),"."]}),"\n",(0,s.jsx)(i.h3,{id:"how-it-works",children:"How It Works"}),"\n",(0,s.jsxs)(i.p,{children:["Caching is based on the asset's URL. ",(0,s.jsx)(i.code,{children:"SPTPersistentCache"})," uses an LRU (",(0,s.jsx)(i.a,{href:"https://en.wikipedia.org/wiki/Cache_replacement_policies#Least_recently_used_(LRU)",children:"Least Recently Used"}),") caching policy."]}),"\n",(0,s.jsx)(i.h3,{id:"restrictions",children:"Restrictions"}),"\n",(0,s.jsxs)(i.p,{children:["Currently, caching is only supported for URLs ending in ",(0,s.jsx)(i.code,{children:".mp4"}),", ",(0,s.jsx)(i.code,{children:".m4v"}),", or ",(0,s.jsx)(i.code,{children:".mov"}),". In future versions, URLs with query strings (e.g., ",(0,s.jsx)(i.code,{children:"test.mp4?resolution=480p"}),") will be supported once dependencies allow access to the ",(0,s.jsx)(i.code,{children:"Content-Type"})," header."]}),"\n",(0,s.jsxs)(i.p,{children:["At this time, HLS playlists (",(0,s.jsx)(i.code,{children:".m3u8"}),") and videos with sideloaded text tracks are not supported and will bypass the cache."]}),"\n",(0,s.jsxs)(i.p,{children:["You will see warnings in the Xcode logs when using ",(0,s.jsx)(i.code,{children:"debug"})," mode. If you're unsure whether your video is cached, check your Xcode logs."]}),"\n",(0,s.jsx)(i.p,{children:"By default, files expire after 30 days, and the maximum cache size is 100MB."}),"\n",(0,s.jsx)(i.p,{children:"Future updates may include more configurable caching options."})]})}i.default=(0,c.j)({MDXContent:function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{wrapper:i}=Object.assign({},(0,t.a)(),e.components);return i?(0,s.jsx)(i,{...e,children:(0,s.jsx)(h,{...e})}):h(e)},pageOpts:{filePath:"pages/other/caching.md",route:"/other/caching",timestamp:1741640585e3,title:"Caching",headings:d},pageNextRoute:"/other/caching"})}},function(e){e.O(0,[673,888,774,179],function(){return e(e.s=6745)}),_N_E=e.O()}]);