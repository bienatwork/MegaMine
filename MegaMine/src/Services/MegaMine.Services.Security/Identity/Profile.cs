﻿//-------------------------------------------------------------------------------------------------
// <copyright file="Profile.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Extension method which retrieves the profile for a user
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Services.Security.Identity
{
    using System.Linq;
    using System.Threading.Tasks;
    using MegaMine.Core.Context;
    using MegaMine.Services.Security.Extensions;
    using MegaMine.Services.Security.Middleware;
    using MegaMine.Services.Security.Models;
    using MegaMine.Services.Security.Repositories;

    public static class Profile
    {
        public static async Task<ProfileModel> Get(string userName, SecurityRepository accountRepository)
        {
            int companyId = NTContext.Context.CompanyId;

            ProfileModel profile = await accountRepository.UserProfileGet(userName, companyId);

            // setting all the roles for admin roles
            if (profile.AdminRoles.Length > 0)
            {
                profile.AdminRoles = PageService.AdminRoles.Where(r => profile.AdminRoles.Contains(r.Key)).Select(r => r.Item).ToArray();
            }

            profile.SetMenu();

            // setting the claims on to the context
            NTContextModel model = new NTContextModel()
            {
                UserId = profile.UserId,
                UserName = profile.UserName,
                FirstName = profile.FirstName,
                LastName = profile.LastName,
                CompanyId = profile.CompanyId
            };
            NTContext.Context = model;

            return profile;
        }
    }
}
