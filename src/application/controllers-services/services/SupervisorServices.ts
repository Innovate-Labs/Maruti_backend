import { Supervisor } from "@/models/supervisor"
import { SupervisorShopLine } from "@/models/supervisor_shop_line";


export const supervisorServicesData = {
    AddSupervisor: async (data: any) => {
        console.log('pppppppppppppp',data)
        const addData = await Supervisor.create(data)
        return addData;
    },
    AddSupervisorMap: async (shopId: string, lineId: string, superviseId: string) => {
        const mapData = await SupervisorShopLine.create({
            shopId,
            lineId,
            superviseId,
        });
        return mapData;
    }
}