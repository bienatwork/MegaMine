﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MegaMine.Services.Widget.Models
{
    public class DashboardModel
    {
        public List<WidgetModel> PageWidgets { get; set; }
        public List<WidgetModel> Widgets { get; set; }
    }
}