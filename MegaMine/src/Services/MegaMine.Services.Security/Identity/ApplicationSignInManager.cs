﻿//-------------------------------------------------------------------------------------------------
// <copyright file="ApplicationSignInManager.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Custom SignInManager to store basic claims such as name, companies
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Services.Security.Identity
{
    using System.Linq;
    using System.Security.Claims;
    using System.Threading.Tasks;
    using MegaMine.Services.Security.Entities;
    using MegaMine.Services.Security.Repositories;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.Extensions.Logging;
    using Microsoft.Extensions.Options;

    public class ApplicationSignInManager : SignInManager<ApplicationUser>
    {
        private SecurityRepository accountRepository;

        public ApplicationSignInManager(SecurityRepository accountRepository, UserManager<ApplicationUser> userManager, IHttpContextAccessor contextAccessor, IUserClaimsPrincipalFactory<ApplicationUser> claimsFactory, IOptions<IdentityOptions> optionsAccessor, ILogger<SignInManager<ApplicationUser>> logger)
            : base(userManager, contextAccessor, claimsFactory, optionsAccessor, logger)
        {
            this.accountRepository = accountRepository;
        }

        public override async Task<ClaimsPrincipal> CreateUserPrincipalAsync(ApplicationUser user)
        {
            var principal = await base.CreateUserPrincipalAsync(user);
            ClaimsIdentity identity = (ClaimsIdentity)principal.Identity;
            var profile = await Profile.Get(user.UserName, this.accountRepository);

            string companies = string.Join(",", profile.Companies.Select(s => s.CompanyId.ToString()));
            string adminRoles = string.Join(",", profile.AdminRoles);

            // adding custom claim
            identity.AddClaim(new Claim(NTClaimTypes.FirstName, profile.FirstName));
            identity.AddClaim(new Claim(NTClaimTypes.LastName, profile.LastName));
            identity.AddClaim(new Claim(NTClaimTypes.CompanyId, profile.CompanyId.ToString()));
            identity.AddClaim(new Claim(NTClaimTypes.Companies, companies));

            return principal;
        }
    }
}