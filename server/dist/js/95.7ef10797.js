"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[95],{95:function(a,t,e){e.r(t),e.d(t,{default:function(){return B}});var n=e(252),s=e(577),o=e(963);const l=a=>((0,n.dD)("data-v-73ec2169"),a=a(),(0,n.Cn)(),a),i=l((()=>(0,n._)("h3",null,"Select Company Here:",-1))),c=["value"],p={key:0,class:"grid"},u={class:"bg-blue-700 p-3 mt-5 text-white"},m={class:"grid"},d=l((()=>(0,n._)("h2",{class:"text-lg text-black"},"Status",-1))),r={class:"grid"},y=l((()=>(0,n._)("h2",{class:"text-lg text-black"},"Sector",-1))),w={class:"grid"},C=l((()=>(0,n._)("h2",{class:"text-lg text-black"},"Instrument",-1))),D={class:"grid"},_=l((()=>(0,n._)("h2",{class:"text-lg text-black"},"Website",-1))),h=l((()=>(0,n._)("h2",{class:"text-2xl"},"Update Details",-1))),b={class:"update-section"},g={class:"flex justify-evenly"},E={class:"grid"},f=l((()=>(0,n._)("h2",null,"Name",-1))),v={class:"grid"},N=l((()=>(0,n._)("h2",null,"Status",-1))),S={class:"grid"},U=l((()=>(0,n._)("h2",null,"Sector",-1))),I={class:"grid"},x=l((()=>(0,n._)("h2",null,"Instrument",-1))),T={class:"grid"},A=l((()=>(0,n._)("h2",null,"Website",-1))),R={class:"p-4"},k={class:"underline"},M=l((()=>(0,n._)("br",null,null,-1)));function z(a,t,e,l,z,L){const O=(0,n.up)("title-bar"),V=(0,n.up)("navigation-container");return(0,n.wg)(),(0,n.iD)("div",null,[(0,n.Wm)(V,null,{title:(0,n.w5)((()=>[(0,n.Wm)(O,{icon:"cloud",text:"Update Company Data"})])),middle:(0,n.w5)((()=>[i,(0,n.wy)((0,n._)("select",{"onUpdate:modelValue":t[0]||(t[0]=a=>z.selectedCompany=a)},[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(z.companiesList,(a=>((0,n.wg)(),(0,n.iD)("option",{key:a,value:a},(0,s.zw)(a),9,c)))),128))],512),[[o.bM,z.selectedCompany]])])),_:1}),"undefined"!=typeof z.companyData.s_no?((0,n.wg)(),(0,n.iD)("div",p,[(0,n._)("span",u,(0,s.zw)(z.companyData.name)+" ("+(0,s.zw)(z.companyData.symbol)+")",1),(0,n._)("div",{class:(0,s.C_)(["text-white p-3 flex infos","ACTIVE"==z.companyData.status.toUpperCase()?"bg-blue-600":"bg-yellow-700"])},[(0,n._)("div",m,[d,(0,n._)("span",null,(0,s.zw)(z.companyData.status),1)]),(0,n._)("div",r,[y,(0,n._)("span",null,(0,s.zw)(z.companyData.sector),1)]),(0,n._)("div",w,[C,(0,n._)("span",null,(0,s.zw)(z.companyData.instrument),1)]),(0,n._)("div",D,[_,(0,n._)("span",null,(0,s.zw)(z.companyData.website),1)])],2),(0,n._)("div",null,(0,s.zw)(z.companyData.info),1),h,(0,n._)("div",b,[(0,n._)("div",g,[(0,n._)("div",E,[f,(0,n.wy)((0,n._)("input",{"onUpdate:modelValue":t[1]||(t[1]=a=>z.newCompanyData.name=a),class:"border-2 border-blue-500 p-2"},null,512),[[o.nr,z.newCompanyData.name]])]),(0,n._)("div",v,[N,(0,n.wy)((0,n._)("select",{"onUpdate:modelValue":t[2]||(t[2]=a=>z.newCompanyData.status=a)},[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(z.validStatus,(a=>((0,n.wg)(),(0,n.iD)("option",{key:a},(0,s.zw)(a),1)))),128))],512),[[o.bM,z.newCompanyData.status]])]),(0,n._)("div",S,[U,(0,n.wy)((0,n._)("select",{"onUpdate:modelValue":t[3]||(t[3]=a=>z.newCompanyData.sector=a)},[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(z.validSectors,(a=>((0,n.wg)(),(0,n.iD)("option",{key:a},(0,s.zw)(a),1)))),128))],512),[[o.bM,z.newCompanyData.sector]])]),(0,n._)("div",I,[x,(0,n.wy)((0,n._)("select",{"onUpdate:modelValue":t[4]||(t[4]=a=>z.newCompanyData.instrument=a)},[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(z.validInstrument,(a=>((0,n.wg)(),(0,n.iD)("option",{key:a},(0,s.zw)(a),1)))),128))],512),[[o.bM,z.newCompanyData.instrument]])]),(0,n._)("div",T,[A,(0,n.wy)((0,n._)("input",{"onUpdate:modelValue":t[5]||(t[5]=a=>z.newCompanyData.website=a),class:"border-2 border-blue-500 p-2"},null,512),[[o.nr,z.newCompanyData.website]])])]),(0,n._)("div",R,[(0,n._)("h2",k," Enter More Information about "+(0,s.zw)(z.companyData.symbol),1),(0,n.wy)((0,n._)("textarea",{"onUpdate:modelValue":t[6]||(t[6]=a=>z.newCompanyData.info=a),class:"w-full border-2 border-green-700 p-3 mt-5",style:{height:"140px"}},null,512),[[o.nr,z.newCompanyData.info]])]),M,(0,n._)("button",{class:"button bg-blue-800",onClick:t[7]||(t[7]=(...a)=>L.updateCompany&&L.updateCompany(...a))}," Update Company ")])])):(0,n.kq)("",!0)])}var L=e(274),O=e(430),V={name:"Update",components:{NavigationContainer:L.Z,TitleBar:O.Z},data(){return{companiesList:[],selectedCompany:"",companyData:{},newCompanyData:{name:"",status:"",sector:"",instrument:"",website:"",info:""},validStatus:["ACTIVE","SUSPENDED","DELISTED"],validInstrument:["EQUITY","NON-CONVERTIBLE DEBENTURES","MUTUAL FUNDS","PREFERENCE SHARES"],validSectors:["MICROFINANCE","COMMERCIAL BANKS","HYDRO POWER","NON LIFE INSURANCE","LIFE INSURANCE","MANUFACTURING AND PROCESSING","TRADINGS","FINANCE","HOTELS AND TOURISM","INVESTMENT","MUTUAL FUND","DEVELOPMENT BANKS","OTHERS"]}},methods:{getCompanies:async function(){let a=await this.$axios.get("/companies/name"),t=await a.data.result;200==a.data.status&&(this.companiesList=t)},getCompany:async function(){if(this.selectedCompany){let a=await this.$axios.get("/company/"+this.selectedCompany),t=await a.data.result;200==a.data.status&&(this.companyData=t,this.newCompanyData.name=t.name,this.newCompanyData.status=t.status.toUpperCase(),this.newCompanyData.sector=t.sector.toUpperCase(),this.newCompanyData.instrument=t.instrument.toUpperCase(),this.newCompanyData.info=t.info)}},updateCompany:async function(){let a=this.newCompanyData;a["symbol"]=this.companyData.symbol;let t=await this.$axios.put("/company/update/"+this.selectedCompany,a);t&&this.fireSuccess("You updated the company Successfully"),this.selectedCompany="",this.companyData={}},fireSuccess:function(a){this.$swal({icon:"success",iconColor:"blue",title:"Superb!!!",text:a,showConfirmButton:!0,confirmButtonText:"Close window"})}},mounted:async function(){await this.getCompanies()},watch:{selectedCompany:async function(){await this.getCompany()}}},H=e(744);const F=(0,H.Z)(V,[["render",z],["__scopeId","data-v-73ec2169"]]);var B=F}}]);
//# sourceMappingURL=95.7ef10797.js.map