import Organization from '@/resources/organization/organization.interface';
declare global {
    namespace Express {
        export interface Request {
            organization: Organization
        }
    }
}