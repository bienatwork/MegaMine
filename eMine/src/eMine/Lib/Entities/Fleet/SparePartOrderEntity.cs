﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Lib.Entities.Fleet
{
    public class SparePartOrderEntity : BaseEntity
    {
        public int SparePartOrderId { get; set; } 
        public int SparePartId { get; set; } 
        public int OrderedUnits { get; set; } 
        public decimal UnitCost { get; set; } 
        public DateTime? OrderedUTCdatetime { get; set; } 
        public DateTime? DeliveredUTCdatetime { get; set; } 
        public string FollowupEmailAddress { get; set; } 
        public string FollowupPhoneNum { get; set; } 
        public int ConsumedUnits { get; set; } 
    }
}
