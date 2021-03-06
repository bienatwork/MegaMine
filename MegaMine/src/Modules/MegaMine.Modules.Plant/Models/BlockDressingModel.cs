﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MegaMine.Modules.Plant.Models
{
    public class BlockDressingModel
    {
        public int BlockDressingId { get; set; }
        public int DressingId { get; set; }
        public int BlockId { get; set; }
        public string BlockNumber { get; set; }
        public decimal LengthBefore { get; set; }
        public decimal WidthBefore { get; set; }
        public decimal HeightBefore { get; set; }
        public decimal? WeightBefore { get; set; }
        public decimal Length { get; set; }
        public decimal Width { get; set; }
        public decimal Height { get; set; }
        public decimal? Weight { get; set; }
    }
}
