﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Models.Quarry
{
    public class MaterialModel
    {
        public int MaterialId { get; set; }
        public int QuarryId { get; set; }
        public int ProductTypeId { get; set; }
        public int MaterialColourId { get; set; }
        public string Dimensions { get; set; }
        public DateTime MaterialDate { get; set; }
    }
}